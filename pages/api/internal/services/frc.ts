import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    endpoint = "/",
    data = "{}"
  } = req.query

  const frcRes = await axios.get("https://frc-api.firstinspires.org/v3.0/" + endpoint.toString(), {
    auth: {
      username: process.env.FRC_USERNAME ?? "NO USERNAME ERROR",
      password: process.env.FRC_PASSWORD ?? "NO PASSWORD ERROR"
    },
    data: JSON.parse(data.toString())
  })

  res.status(frcRes.status).send(frcRes.data)
}