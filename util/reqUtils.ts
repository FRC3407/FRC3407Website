import { NextApiRequest, NextApiResponse } from "next";

function filterBadReq(req: NextApiRequest, res: NextApiResponse) {
  console.log(req);
  if (req.headers["sec-fetch-site"] !== "same-origin") {
    res.status(403).send("no");
    return false;
  }

  return true;
}

export { filterBadReq };
