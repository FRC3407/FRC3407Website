import { XMLParser } from "fast-xml-parser";
import fsp from "fs/promises";
import path from "path";
import matter from "gray-matter";
import jsonResources from "json/resources.json";

export default async function getResources() {
  const files = await Promise.all(
    (
      await readdir()
    ).map(async (file) => {
      file = file.replace("\\", "/");
      switch (path.extname(file)) {
        case ".json":
          const jsonData = JSON.parse(
            (
              await fsp.readFile(
                path.join(process.cwd(), "public", "static", "resources", file)
              )
            ).toString()
          );
          return {
            meta: jsonData.meta ?? {},
            file,
            type: "json",
          };
        case ".html":
          return {
            file,
            type: "html",
          };
        case ".xml":
          const parse = new XMLParser();
          const data = parse.parse(
            await fsp.readFile(
              path.join(process.cwd(), "public", "static", "resources", file)
            )
          );
          return {
            file,
            meta: data.document.meta ?? {},
            type: "xml",
          };
        case ".md":
          const content = matter(
            await fsp.readFile(
              path.join(process.cwd(), "public", "static", "resources", file)
            )
          );

          return {
            meta: content.data ?? {},
            file,
            type: "md",
          };
        default:
          return { file, type: path.extname(file).replace(/[^a-z0-9]/gi, "") };
      }
    })
  );

  return [...files, ...jsonResources];
}

export async function readdir(dirPath?: string): Promise<string[]> {
  let dirContent: string[] = [];
  await Promise.all(
    (
      await fsp.readdir(
        path.join(process.cwd(), "public", "static", "resources", dirPath ?? "")
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

export async function recursiveReadFolder(folderPath: string): Promise<string[]> {
  let files: string[] = []
  await Promise.all((await fsp.readdir(folderPath)).map(async (folder) => (await fsp.lstat(path.join(folderPath, folder))).isDirectory() ? files.push(...await recursiveReadFolder(path.join(folderPath, folder))) : files.push(path.join(folderPath, folder))))

  return files
}