import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
        name: "the brady login thingy",
        credentials: {
            username: { label: "Username", type: "text", placeholder: "jsmith" },
            password: { label: "Password", type: "password" }
        },
        async authorize(credentials, req) {

            console.log(credentials, req)
            // Add logic here to look up the user from the credentials supplied
            const user: { [key: string]: { id: number, name: string }} = {
                Brady: { id: 0, name: "Brady" }
            }
      
            if (credentials?.username && typeof user[credentials.username] !== "undefined") {
              // Any object returned will be saved in `user` property of the JWT
              console.log(user[credentials.username])
              return user[credentials.username] as any
            } else {
              // If you return null then an error will be displayed advising the user to check their details.
              throw new Error("Invalid User")
      
              // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
            }
        }
    })
  ],
  pages: {
    error: '/auth/error',
  }
}

export default NextAuth(authOptions)