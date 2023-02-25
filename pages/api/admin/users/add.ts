import { NextApiRequest, NextApiResponse } from "next";
import UserSchema, { IUser } from "db/schemas/user.schema";
import connect from "db/connection";
import { getToken } from "next-auth/jwt";
import { UserAccessLevelRolesDisplayNameEnum } from "util/enums";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = await getToken({ req });

  if (
    !user ||
    req.method !== "POST" ||
    req.headers["sec-fetch-site"] !== "same-origin" ||
    (req.headers.referer &&
      new URL(req.headers.referer).host !== req.headers.host)
  ) {
    return res.status(401).send("How bout not");
  }

  if (
    (await UserSchema.findOne({ email: user.email }).exec())?.accessLevel !==
    UserAccessLevelRolesDisplayNameEnum.Administrator
  ) {
    return res.status(403).json("Just get higher permissions lol");
  }

  try {
    if ((await connect()) === "NO URI PROVIDED") {
      return res.status(503).json({ message: "Missing Mongo URI Error" });
    }

    const newUser = new UserSchema(req.body.user) as IUser;
    await newUser.validate();

    if ((await UserSchema.find({ email: newUser.email })).length) {
      return res.status(400).json({ message: "User already exists" });
    }

    res.status(200).send({ user: await newUser.save() });
  } catch (error: any) {
    res.status(400).send(error);
  }
}
