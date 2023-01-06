import connect from "db/connection";
import Users from "db/schemas/user.schema";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { UserAccessLevelRolesEnum } from "util/enums";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const token = await getToken({ req })

    if (!token || (token as any).accessLevel >= UserAccessLevelRolesEnum["adm"]) {
        return res.status(403).end()
    }

    if (await connect() === "NO URI PROVIDED") {
        return res.status(503).send("Couldn't connect to Mongo Database")
    }

    if (req.method?.toUpperCase() === "GET") {
        try {
            const users = await Users.find(req.body.query)
            return res.status(200).send(users)
        } catch (error) {
            return res.status(500).send(error)
        }
    }

    if (req.method?.toUpperCase() === "PUT") {
        if (!req.body.user) return res.status(400).end()

        let user = new Users(req.body.user)

        try {
            user = await user.save()
            return res.status(200).send(user._id)
        } catch (error) {
            return res.status(400).send(error)
        }
    }

    res.status(405).end()
}