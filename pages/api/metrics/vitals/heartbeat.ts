import { NextApiRequest, NextApiResponse } from "next";

// Use this for RTT preformance calculations
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).send(new Date().toISOString());
}
