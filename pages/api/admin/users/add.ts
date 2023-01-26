import { NextApiRequest, NextApiResponse } from "next";
import UserSchema, { IUser } from "db/schemas/user.schema";
import connect from "db/connection";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    let newUser: IUser
     try {
        if (await connect() === "NO URI PROVIDED") {
            return res.status(500).send("Missing Mongo URI Error")
        }

        newUser = new UserSchema(req.body.user) as IUser
        await newUser.validate()
        res.status(200).send(newUser.id)
    } catch(error) {
        res.status(400).send(error)
    }
}