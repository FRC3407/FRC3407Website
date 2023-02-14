import connect from "db/connection";
import userSchema from "db/schemas/user.schema";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { UserAccessLevelRolesDisplayNameEnum } from "util/enums";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const user = await getToken({ req });

    if ((await connect()) === "NO URI PROVIDED")
      return res.status(500).send({ error: { message: "No DB connection" } });

    if (
      !user ||
      req.method !== "PUT" ||
      req.headers["sec-fetch-site"] !== "same-origin" ||
      !req.headers.referer ||
      new URL(req.headers.referer).host !== req.headers.host
    ) {
      return res.status(401).send("How bout not");
    }

    if (
      ((await userSchema.findOne({ email: user.email }).exec())?._id.toString() ?? "") !== req.query.id ?? "") {
      return res.status(403).json("You can't modify other user's information");
    }

    if (
      req.body.data.displayUrl === "customize" ||
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
        personalData: {
          ...req.body.data.personalData,
        },
      },
      { new: true }
    );

    res.status(200).send(doc?.toJSON());
  } catch (error: any) {
    res
      .status(error.code ?? 500)
      .send({ error: { message: error.message ?? "Unknown Error" } });
  }
}
