import userSchema from "db/schemas/user.schema";
import connect from "db/connection";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { UserAccessLevelRolesDisplayNameEnum } from "util/enums";
import partSchema from "db/schemas/part.schema";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.headers["sec-fetch-site"] !== "same-origin" || req.headers["sec-fetch-mode"] !== "cors") throw new Error("Not Authorized")

    const user = await getToken({ req })

    if (!user) return res.redirect("/api/auth/signin?error=SessionRequired")
  
    if (await connect() === "NO URI PROVIDED") throw new Error("No Mongo URI")
  
    if (((await userSchema.findById(user.userId ?? ""))?.accessLevel || 0) < UserAccessLevelRolesDisplayNameEnum.Administrator) throw new Error("Not authorized")

    const updated = await partSchema.findByIdAndUpdate(req.query.id ?? req.body.id, req.query.update ?? req.body.update, { new: true })

    res.status(200).send({
      updated
    })
  } catch (error: any) {
    console.error(error)
    res.status(500).send({
      error
    })
  }
}