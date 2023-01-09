import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs/promises"
import path from "path";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<string>
  ) {
    return res.status(200).json(JSON.stringify(await fs.readdir(path.join(process.cwd(), "json"))));
  }
  