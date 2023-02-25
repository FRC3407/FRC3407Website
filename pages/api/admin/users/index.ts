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
    req.headers["sec-fetch-site"] !== "same-origin" ||
    (req.headers.referer &&
      new URL(req.headers.referer).host !== req.headers.host)
  ) {
    return res.status(401).send("How bout not");
  }

  if (token.accessLevel !== UserAccessLevelRolesDisplayNameEnum.Administrator) {
    return res.status(403).json("Just get higher permissions lol");
  }

  if ((await connect()) === "NO URI PROVIDED") {
    return res.status(503).send("Couldn't connect to Mongo Database");
  }

  if (req.method?.toUpperCase() === "GET") {
    try {
      const users = await Users.find(req.body.query);
      const queryTime = new Date().getTime();
      await Promise.all(
        users.map(async (user) => {
          if (user.accessExpires && user.accessExpires.getTime() < queryTime) {
            user.accessLevel = 1;
            user.accessExpires = undefined;
            await user.save();
            return user;
          }
          return user;
        })
      );
      return res.status(200).send(users);
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  res.status(405).end();
}
