import NextAuth, { AuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { UserAccessLevelRolesEnum } from "../../../util/enums";

export const authOptions: AuthOptions = {
  callbacks: {
    async signIn({ user, account, profile, credentials }) {
      return true;
    },

    async jwt({ token, user, account, profile, isNewUser }) {
      if (!token.accessLevel)
        token.accessLevel = parseInt((user as any)?.accessLevel || 0);
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
        accessLevel: {
          label: "Access Level (0-4)",
          type: "number",
          min: 0,
          max: 4,
        },
      },

      async authorize(credentials, req) {
        if (credentials?.username) {
          return {
            name: credentials.username || "",
            id: "5",
            accessLevel: credentials?.accessLevel,
          };
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
