import { NextApiRequest, NextApiResponse } from "next";
import fsp from "fs/promises";
import path from "path";
import content from "json/resources.json";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  async function readdir(dirPath?: string): Promise<string[]> {
    let dirContent: string[] = [];
    await Promise.all(
      (
        await fsp.readdir(
          path.join(
            process.cwd(),
            "public",
            "static",
            "resources",
            dirPath ?? ""
          )
        )
      ).map(async (file) => {
        if (
          (
            await fsp.lstat(
              path.join(
                process.cwd(),
                "public",
                "static",
                "resources",
                dirPath ?? "",
                file
              )
            )
          ).isDirectory()
        ) {
          dirContent = [
            ...dirContent,
            ...(await readdir(path.join(dirPath ?? "", file))).map((filename) =>
              path.join(dirPath ?? "", file, filename)
            ),
          ];
        } else dirContent.push(file);
      })
    );

    return dirContent;
  }

  res.send([...content, ...(await readdir())]);
}
