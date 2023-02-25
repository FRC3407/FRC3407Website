import { NextApiRequest, NextApiResponse } from "next";
import fsp from "fs/promises";
import path from "path";
import Jimp from "jimp";
import { modifyImage } from "util/images";

const acceptedJohnTypes = [".jpg", ".png"];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const files = (
    await fsp.readdir(
      path.join(process.cwd(), "public/static/images/assets/john")
    )
  ).filter((file) => acceptedJohnTypes.includes(path.extname(file)));
  const image = files[Math.floor(Math.random() * files.length)];

  let jimpImage = await Jimp.read(
    path.join(process.cwd(), "public/static/images/assets/john", image)
  );

  const modImageSuccess = modifyImage(
    jimpImage,
    req.query as { [key: string]: string | undefined }
  );

  if (modImageSuccess !== true) {
    return res.status(400).send(modImageSuccess);
  }

  res.setHeader("Content-Type", jimpImage.getMIME());
  res.status(200).send(await jimpImage.getBufferAsync(jimpImage.getMIME()));
}
