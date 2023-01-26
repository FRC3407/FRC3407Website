import { NextApiRequest, NextApiResponse } from "next";
import UserSchema, { IUser } from "db/schemas/user.schema";
import connect from "db/connection";
import { getToken } from "next-auth/jwt";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const user = await getToken({ req })

    console.log(req)

    if (!user) {
        return res.status(401).send("<h1>Identify Yourself</h1>")
    }

    if (user.accessLevel) {
        return res.status(403).json("Just get higher permissions lol")
    }

     try {
        if (await connect() === "NO URI PROVIDED") {
            return res.status(500).send("Missing Mongo URI Error")
        }

        const newUser = new UserSchema(req.body.user) as IUser
        await newUser.validate()

        if ((await UserSchema.find({ email: newUser.email })).length) {
            return res.status(400).json({ error: { message: "Duplicate User" } })
        }
        res.status(200).send(newUser)
    } catch(error: any) {
        res.status(400).send(error)
    }
}
