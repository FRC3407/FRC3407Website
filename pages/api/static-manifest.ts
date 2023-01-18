import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs/promises";
import path from "path";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string[] | string>
) {
  const files = await fs.readdir(path.join(process.cwd(), "public"));
}
