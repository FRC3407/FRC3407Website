import { NextApiRequest, NextApiResponse } from "next";
import slack from "util/services/slack";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string[] | string>
) {
  console.log(await slack().api.test())
  res.send("hi")
}
