import { NextApiRequest, NextApiResponse } from "next";
import connect from "db/connection";
import { getToken } from "next-auth/jwt";
import Feedback from "db/schemas/feedback.schema";
import getConfig from "next/config";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = await getToken({ req });
  const config = getConfig();

  if (
    !user ||
    req.headers["sec-fetch-site"] !== "same-origin" ||
    req.method !== "GET" ||
    (req.headers.referer &&
      new URL(req.headers.referer).host !== req.headers.host)
  ) {
    return res.status(401).redirect("/feedback");
  }

  try {
    if ((await connect()) === "NO URI PROVIDED") {
      return res.status(503).redirect("/feedback?error=no_uri");
    }

    if (!user.email) return res.status(400).redirect("/feedback?thanks=t");

    if (
      (
        await Feedback.find({
          contact: user.email,
          buildId: config.serverRuntimeConfig.buildId,
        }).exec()
      ).length > 0
    )
      return res.status(403).redirect("/feedback?thanks=t");

    await new Feedback({
      buildId: config.serverRuntimeConfig.buildId,
      contact: user.email,
      ...req.query,
      overallStarRating: parseFloat(req.query.overallStarRating as string),
      speedStarRating: parseFloat(req.query.speedStarRating as string),
      easeOfUseStarRating: parseFloat(req.query.easeOfUseStarRating as string),
      visualAppealStarRating: parseFloat(
        req.query.visualAppealStarRating as string
      ),
    }).save();

    res.status(200).redirect("/feedback?thanks=t");
  } catch (error: any) {
    res.status(400).send(error);
  }
}
