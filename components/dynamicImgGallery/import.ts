import * as fs from "fs/promises";
import path from "path";

const getImages = async (folder: string) =>
  await fs.readdir(
    path.join(process.cwd(), "public")
  );

export default getImages;
