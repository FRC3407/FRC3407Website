import { NextApiRequest, NextApiResponse } from "next";
import slack from "util/services/slack";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string[] | string>
) {
  const result = await slack().api.test()
  // so it will push
  console.log(result)
  res.send("hi")
}
