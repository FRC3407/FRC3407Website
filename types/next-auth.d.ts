import NextAuth, { DefaultSession } from "next-auth/next";

declare module "next-auth" {
    interface Session {
        user: {
            accessLevel: number
        } & DefaultSession["user"]
    }
}