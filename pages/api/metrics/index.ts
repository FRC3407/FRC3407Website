import { NextApiRequest, NextApiResponse } from "next";
import { getReports } from "../../../db/metrics";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).send(getReports());
}
