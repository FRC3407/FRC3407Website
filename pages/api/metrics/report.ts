import connect from "db/connection";
import Report from "db/schemas/report.schema";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).send("Thanks fetch function, ur the bestest");
  if (
    req.method !== "PUT" ||
    req.headers["sec-fetch-site"] !== "same-origin" ||
    !req.headers.referer
  )
    return;

  const connection = await connect();

  if (connection === "NO URI PROVIDED" || process.env.MAKE_REPORTS === "n")
    return;

  try {
    await new Report({
      path: new URL(req.headers.referer).pathname,
      ...req.body,
    }).save();
  } catch (err) {
    console.error(err);
  }
}
