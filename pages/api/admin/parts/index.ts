import connect from "db/connection";
import PartSchema from "db/schemas/part.schema";
import userSchema from "db/schemas/user.schema";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { UserAccessLevelRolesDisplayNameEnum } from "util/enums";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.headers["sec-fetch-site"] !== "same-origin" || req.headers["sec-fetch-mode"] !== "navigate") throw new Error("Not Authorized")

    const user = await getToken({ req })

    if (!user) return res.redirect("/api/auth/signin?error=SessionRequired")
  
    if (await connect() === "NO URI PROVIDED") throw new Error("No Mongo URI")
  
    if (((await userSchema.findById(user.userId ?? ""))?.accessLevel || 0) < UserAccessLevelRolesDisplayNameEnum.Administrator) throw new Error("Not authorized")
  
    const partRequests = PartSchema.find()

    res.status(200).send({
      requests: partRequests
    })
  } catch (error: any) {
    res.status(500).send({
      error
    })
  }
}