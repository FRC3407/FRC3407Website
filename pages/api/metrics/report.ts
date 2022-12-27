import { NextApiRequest, NextApiResponse } from "next";
import { addReport } from "../../../db/metrics";
import { domainRegex } from "../../../util/regex";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).send("Thanks fetch function, ur the bestest");
  if (
    req.method !== "PUT" ||
    req.headers["sec-fetch-site"] !== "same-origin" ||
    !req.headers.referer
  )
    return;
  addReport({
    path: req.headers.referer.replace(domainRegex, ""),
    time: new Date().toISOString(),
    ...req.body,
  } as never);
}
