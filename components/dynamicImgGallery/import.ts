import * as fs from "fs/promises";
import * as fss from "fs"
import path from "path";

const getImages = async (folder: string) => {

  let files = await fs.readdir(
    path.join(process.cwd(), "public", "static", "images", "dynamic", folder)
  );

  files.map((file) => {
    if (fss.statSync(path.join(process.cwd(), "public", "static", "images", "dynamic", folder, file)).isDirectory()) console.log(file)
    return file
  })
  

  return files
}

export default getImages;
