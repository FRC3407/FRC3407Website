import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const content = await axios.get(
    "https://www.googleapis.com/calendar/v3/calendars/moundsviewrobotics@gmail.com/events",
    {
      params: {
        key: process.env.GOOGLE_API_KEY,
        updatedMin: new Date("1/1/23").toISOString(),
      },
    }
  );
  res.status(200).json(
    content.data.items.map((val: { title: any; summary: string }) => {
      val.title = val.summary ?? "No title";
      return val;
    })
  );
}
