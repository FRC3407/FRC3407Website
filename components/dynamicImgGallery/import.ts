import * as fs from "fs/promises";
import path from "path";

export default async function importImages() {
  console.log(await fs.readdir(path.join(process.cwd(), "public", "images")));
}
