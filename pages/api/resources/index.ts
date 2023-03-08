import { NextApiRequest, NextApiResponse } from "next";
import content from "json/resources.json";
import getResources, { readdir } from "util/resources";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.query.format === "json") {
    return res.status(200).send(await getResources());
  }

  res
    .status(200)
    .send([
      ...content.filter((val: any) => !!val?.name).map((val: any) => val.name),
      ...(await readdir()),
    ]);
}
