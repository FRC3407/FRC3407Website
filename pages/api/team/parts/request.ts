import PartSchema from "db/schemas/part.schema";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const user = await getToken({ req })

  if (!user) return res.redirect("/api/auth/signin?error=SessionRequired")

  await new PartSchema({
    ...req.query,
    user: {
      name: user?.name,
      email: user?.email,
      userId: user?.userId
    }
  })
  res.redirect("/team/parts/request")
}