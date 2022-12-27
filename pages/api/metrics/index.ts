import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { getReports } from "../../../db/metrics";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const reports = fs.readFileSync(
    path.join(process.cwd(), "json/metrics.json"),
    "utf-8"
  );
  console.log(reports);
  res.status(200).send(reports);
}
