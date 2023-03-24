import { NextApiRequest, NextApiResponse } from "next";
// import fsp from "fs/promises";
// import path from "path";
// import { modifyImage } from "util/images";

const acceptedJohnTypes = [".jpg", ".png"];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // if (!(global as any).john?.files) {
  //   (global as any).john = {
  //     files: (
  //       await fsp.readdir(
  //         path.join(process.cwd(), "public/static/images/assets/john")
  //       )
  //     ).filter((file) => acceptedJohnTypes.includes(path.extname(file))),
  //   };
  // }
  // const image = (global as any).john.files[
  //   Math.floor(Math.random() * (global as any).john.files.length)
  // ];

  // let jimpImage = await modifyImage(
  //   path.join(process.cwd(), "public/static/images/assets/john", image),
  //   req.query as { [key: string]: string | undefined }
  // );

  // if (typeof jimpImage === "string") {
  //   return res.status(400).send(jimpImage);
  // }

  // res.setHeader("Content-Type", jimpImage.getMIME());
  // res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
  // res.status(200).send(await jimpImage.getBufferAsync(jimpImage.getMIME()));
}
