import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const frcUrl = new URL("https://frc-api.firstinspires.org/v3.0/2023")
  frcUrl.searchParams.append("authorization", "YnJhZHliYW5nYXNzZXI6NzM5Y2ZlOTEtYzZhNy00MTU4LWExMGMtMjBlZjI5NDNkN2E4")
  console.log(frcUrl.toString())
  const frcRes = await fetch(frcUrl, {
    headers: {
      authorization: "YnJhZHliYW5nYXNzZXI6NzM5Y2ZlOTEtYzZhNy00MTU4LWExMGMtMjBlZjI5NDNkN2E4"
    }
  })
  console.log("here", frcRes)
  return res.status(200).send(frcRes.status)
}