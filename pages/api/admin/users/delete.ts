import connect from "db/connection";
import Users from "db/schemas/user.schema";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { UserAccessLevelRolesDisplayNameEnum } from "util/enums";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({ req });

  if (
    !token ||
    req.method !== "DELETE" ||
    req.headers["sec-fetch-site"] !== "same-origin" ||
    (req.headers.referer &&
    new URL(req.headers.referer).host !== req.headers.host)
  ) {
    return res.status(401).send("How bout not");
  }

  try {
    if ((await connect()) === "NO URI PROVIDED") {
      return res
        .status(503)
        .send({ error: { message: "Couldn't connect to Mongo Database" } });
    }

    if (
      (await Users.findOne({ email: token.email }).exec())?.accessLevel !==
      UserAccessLevelRolesDisplayNameEnum.Administrator
    ) {
      return res.status(403).json("Just get higher permissions lol");
    }

    const user = await Users.findByIdAndDelete(req.body.id);

    if (!user) {
      return res.status(400).send({
        error: { message: `No user with the ID ${req.body.id} exists` },
      });
    }

    res.status(200).send({ message: "User Deleted" });
  } catch (error) {
    return res.status(400).send({ error });
  }
}
