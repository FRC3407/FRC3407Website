import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { getReports } from "../../../db/metrics";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).send([]);
}
