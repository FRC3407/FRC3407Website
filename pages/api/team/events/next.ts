import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const blueRes = await fetch(
    `https://www.thebluealliance.com/api/v3/team/frc3407/events/${new Date().getFullYear()}?X-TBA-Auth-Key=${
      process.env.BLUE_ALLIANCE_KEY
    }`
  );

  const resContent = await blueRes.json();

  res
    .status(blueRes.status)
    .send(
      Array.isArray(resContent)
        ? resContent[0] ?? { error: "no event" }
        : resContent
    );
}
