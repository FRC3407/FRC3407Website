import NextAuth, { AuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { UserAccessLevelRolesEnum } from "../../../util/enums";

export const authOptions: AuthOptions = {
  callbacks: {
    async signIn(params) {
      return true;
    },

    async jwt({ token }) {
      token.accessLevel = UserAccessLevelRolesEnum["dev"];
      return token;
    },

    async session({ token, session, user }) {
      (session.user as any).accessLevel = token.accessLevel;
      return session;
    },
  },

  providers: [
    // Remove this provider in production, it's only for testing
    CredentialsProvider({
      name: "the brady login thingy",
      credentials: {
        username: {
          label: "Email",
          type: "text",
          placeholder: "red@theimposter.sus",
        },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        if (credentials?.username) {
          return { name: credentials.username || "", id: "5" };
        } else {
          throw new Error("Invalid User");
        }
      },
    }),
  ],
  pages: {
    error: "/auth/error",
  },
};

export default NextAuth(authOptions);
