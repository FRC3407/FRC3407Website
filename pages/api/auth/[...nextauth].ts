import connect from "db/connection";
import Users from "db/schemas/user.schema";
import NextAuth, { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { removeImageParams } from "util/images";
import slack from "util/services/slack";

export const authOptions: AuthOptions = {
  callbacks: {
    async signIn() {
      return true;
    },

    async jwt({ token }) {
      if (typeof token.accessLevel !== "number") {
        let accessLevel = 0;

        if ((await connect()) === "NO URI PROVIDED") {
          throw new Error("No Mongo URI");
        } else {
          const dbUser = await Users.findOne({ email: token.email }).exec();
          if (dbUser) {
            accessLevel = dbUser.accessLevel;
            token.userId = dbUser._id.toString();

            let changed = false;

            if (
              typeof dbUser.personalData?.primaryImage !== "string" &&
              typeof token.picture === "string"
            ) {
              if (!dbUser.personalData) dbUser.personalData = {};
              dbUser.personalData.primaryImage = removeImageParams(
                token.picture
              );
              changed = true;
            }

            if (
              dbUser.accessExpires &&
              dbUser.accessExpires.getTime() <= new Date().getTime()
            ) {
              dbUser.accessExpires = undefined;
              dbUser.accessLevel = 1;
              changed = true;
            }

            if (changed) await dbUser.save();
          } else {
            const slackUserEmails = (await slack().users.list()).members
              ?.filter((member) => !member.is_bot && member.is_email_confirmed)
              .map((member) => member?.profile?.email);

            accessLevel = 1;

            if (slackUserEmails?.includes(token.email?.toString())) {
              accessLevel = 2;
            }

            const splitName = token.name?.split(" ");

            await new Users({
              firstName: splitName?.shift(),
              lastName: splitName?.join(),
              accessLevel,
              email: token.email,
              team: "noteam",
              isJohnLofton: token.email === "2024loftj12@moundsviewschools.org",
              personalData: {
                primaryImage: removeImageParams(token.picture as any),
              },
            }).save();
          }
        }

        token.accessLevel = accessLevel;
      }

      return token;
    },

    async session({ token, session }) {
      session.user.accessLevel = token.accessLevel;
      session.user.id = token.userId;
      return session;
    },
  },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET ?? "",
    }),
    GithubProvider({
      clientId: process.env.GITHUB_OAUTH_CLIENT_ID ?? "",
      clientSecret: process.env.GITHUB_OAUTH_CLIENT_SECRET ?? "",
    }),
  ],
  pages: {
    error: "/error",
    signIn: "/auth/signin",
    signOut: "/auth/signout",
  },
  session: {
    maxAge: 60 * 60 * 24,
  },
};

export default NextAuth(authOptions);
