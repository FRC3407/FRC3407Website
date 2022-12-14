import { NextApiRequest, NextApiResponse } from "next";
import { filterBadReq } from "../../../util/reqUtils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!filterBadReq(req, res)) return;

  res.status(200).send("yay");
}
