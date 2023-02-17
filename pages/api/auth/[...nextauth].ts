import connect from "db/connection";
import Users from "db/schemas/user.schema";
import NextAuth, { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

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

            if (
              typeof dbUser.personalData?.primaryImage !== "string" &&
              typeof token.picture === "string"
            ) {
              await Users.findByIdAndUpdate(dbUser._id.toString(), {
                personalData: {
                  ...(dbUser.personalData ?? {}),
                  primaryImage: token.picture,
                },
              });
            }
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
};

export default NextAuth(authOptions);
