import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "the brady login thingy",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log(credentials, req);
        // Add logic here to look up the user from the credentials supplied
        const user: { [key: string]: { id: number; name: string } } = {
          Brady: { id: 0, name: "Brady" },
        };

        if (
          credentials?.username &&
          typeof user[credentials.username] !== "undefined"
        ) {
          console.log(user[credentials.username]);
          return user[credentials.username] as any;
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
