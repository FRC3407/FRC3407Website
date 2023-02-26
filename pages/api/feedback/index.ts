import { NextApiRequest, NextApiResponse } from "next";
import UserSchema, { IUser } from "db/schemas/user.schema";
import connect from "db/connection";
import { getToken } from "next-auth/jwt";
import { UserAccessLevelRolesDisplayNameEnum } from "util/enums";
import Feedback from "db/schemas/feedback.schema";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = await getToken({ req });

  // if (
  //   !user ||
  //   req.headers["sec-fetch-site"] !== "same-origin" ||
  //   (req.headers.referer &&
  //     new URL(req.headers.referer).host !== req.headers.host)
  // ) {
  //   return res.status(401).send("How bout not");
  // }

  try {
    // if ((await connect()) === "NO URI PROVIDED") {
    //   return res.status(503).json({ message: "Missing Mongo URI Error" });
    // }

    // console.log(new Feedback(req.query))

    res.status(200).redirect("/feedback/thanks")

    
  } catch (error: any) {
    res.status(400).send(error);
  }
}
