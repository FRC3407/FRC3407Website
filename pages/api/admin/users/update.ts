import connect from "db/connection";
import UserSchema from "db/schemas/user.schema";
import { getToken } from "next-auth/jwt";
import { NextApiRequest, NextApiResponse } from "next/types";
import { UserAccessLevelRolesDisplayNameEnum } from "util/enums";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({ req });

  if (
    !token ||
    req.method !== "POST" ||
    req.headers["sec-fetch-site"] !== "same-origin" ||
    !req.headers.referer ||
    new URL(req.headers.referer).host !== req.headers.host
  ) {
    return res.status(401).send("How bout not");
  }

  try {
    if ((await connect()) === "NO URI PROVIDED") {
      return res.status(503).send("Couldn't connect to Mongo Database");
    }

    if (
      (await UserSchema.findOne({ email: token.email }).exec())?.accessLevel !==
      UserAccessLevelRolesDisplayNameEnum.Administrator
    ) {
      return res.status(403).json("Just get higher permissions lol");
    }

    const user = await UserSchema.findByIdAndUpdate(
      req.body.user._id,
      req.body.user
    )
      .lean()
      .exec();
    res.status(200).send({ user });
  } catch (error) {
    res.status(500).send({ error });
  }
}
