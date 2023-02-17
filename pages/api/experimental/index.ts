import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // https://www.thebluealliance.com/apidocs/v3
  const TBARes = await axios.get(
    "https://www.thebluealliance.com/api/v3/team/frc2052",
    {
      headers: {
        "X-TBA-Auth-Key": process.env.BLUE_ALLIANCE_KEY ?? "NO KEY ERROR",
      },
    }
  );

  res.status(TBARes.status).send(TBARes.data);
}
