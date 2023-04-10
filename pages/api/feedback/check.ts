import connect from "db/connection";
import FeedbackSchema from "db/schemas/feedback.schema";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import getConfig from "next/config";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if ((await connect()) === "NO URI PROVIDED") {
      return res.status(503).send("Couldn't connect to the DB");
    }

    const config = getConfig();
    const user = await getToken({ req });

    if (!user?.email) return res.status(401).send("How bout no");

    if (
      (
        await FeedbackSchema.find({
          contact: user.email,
          buildId: config.serverRuntimeConfig.buildId,
        }).exec()
      ).length > 0
    ) {
      return res.status(200).send("false");
    }

    return res.status(200).send("true");
  } catch (error: any) {
    return res.status(500).send(error.message ?? "Unknown Error");
  }
}
