import connect from "db/connection";
import userSchema from "db/schemas/user.schema";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { UserAccessLevelRolesDisplayNameEnum } from "util/enums";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const user = await getToken({ req });

    if ((await connect()) === "NO URI PROVIDED")
      return res
        .status(500)
        .send({ error: { message: "Cannot connect to db" } });

    if (
      !user ||
      req.method !== "GET" ||
      req.headers["sec-fetch-site"] !== "same-origin" ||
      !req.headers.referer ||
      new URL(req.headers.referer).host !== req.headers.host
    ) {
      return res.status(401).send("How bout not");
    }

    if (
      ((await userSchema.findOne({ email: user.email }).exec())?.accessLevel ??
        0) < UserAccessLevelRolesDisplayNameEnum.Member
    ) {
      return res.status(403).json("Just get higher permissions lol");
    }

    try {
      const user = await userSchema.findById(req.query.id).lean().exec();

      if (user === null)
        return res.status(400).send({ error: { message: "User Not Found" } });
      res.status(200).send(user);
    } catch (error: any) {
      res.status(error.code ?? 500).send({ error: { message: error.message } });
    }
  } catch (error: any) {
    res
      .status(error.code ?? 500)
      .send({ error: { message: error.message ?? "Unknown Error" } });
  }
}
