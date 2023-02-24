import { NextApiRequest, NextApiResponse } from "next";
import slack from "util/services/slack";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string[] | string>
) {
  const result = await slack().users.list()
  res.status(200).send(JSON.stringify(result.members?.filter((member) => !member.is_bot && member.is_email_confirmed)[0].profile?.email))
}
