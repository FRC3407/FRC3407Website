import connect from "db/connection";
import userSchema from "db/schemas/user.schema";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if ((await connect()) === "NO URI PROVIDED")
    return res.status(500).send({ error: { message: "Cannot connect to db" } });
  try {
    const user = await userSchema.findById(req.query.id).lean().exec();

    if (user === null)
      return res.status(400).send({ error: { message: "User Not Found" } });
    res.status(200).send(user);
  } catch (error: any) {
    res.status(error.code ?? 500).send({ error: { message: error.message } });
  }
}
