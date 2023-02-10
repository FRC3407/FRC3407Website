import connect from "db/connection";
import userSchema from "db/schemas/user.schema";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if ((await connect()) === "NO URI PROVIDED")
    return res.status(500).send({ error: { message: "No DB connection" } });

  if (
    (
      await (userSchema as any).findOneByDisplayUrl(req.body.data.displayUrl)
    )._id.toString() !== req.query.id
  )
    return res
      .status(400)
      .send({ error: { message: "That Display URL is taken" } });

  let newUser = (await userSchema.findById(req.query.id)) as any;
  const doc = await userSchema.findByIdAndUpdate(
    newUser._id,
    {
      displayUrl: req.body.data.displayUrl ?? newUser?.displayUrl,
      importUrl: req.body.data.importUrl ?? newUser?.importUrl,
      personalData: { ...newUser.personalData, ...req.body.data.personalData },
    },
    { new: true }
  );

  res.status(200).send(doc?.toJSON());
}
