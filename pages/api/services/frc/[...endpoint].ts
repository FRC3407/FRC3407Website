import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.headers);

  if (
    req.headers["sec-fetch-site"] !== "same-origin" ||
    req.headers["sec-fetch-mode"] !== "cors"
  ) {
    return res.status(403).send("no");
  }

  const blueRes = await fetch(
    `https://www.thebluealliance.com/api/v3/${(
      req.query?.endpoint as string[]
    ).join("/")}?X-TBA-Auth-Key=${process.env.BLUE_ALLIANCE_KEY}`
  );

  res.status(blueRes.status).send(await blueRes.json());
}
