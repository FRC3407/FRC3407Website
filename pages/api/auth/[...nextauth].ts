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
        let accessLevel = 1

        if (await connect() !== "NO URI PROVIDED") {
          const dbUser = await Users.findOne({ email: token.email })

          if (dbUser) accessLevel = dbUser.accessLevel
        }

        token.accessLevel = accessLevel;
      }
        
      return token;
    },

    async session({ token, session }) {
      session.user.accessLevel = token.accessLevel;
      return session;
    },
  },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET ?? ""
    }),
    GithubProvider({
      clientId: process.env.GITHUB_OAUTH_CLIENT_ID ?? "",
      clientSecret: process.env.GITHUB_OAUTH_CLIENT_SECRET ?? ""
    })
  ],
  pages: {
    error: "/auth/error",
  },
};

export default NextAuth(authOptions);
