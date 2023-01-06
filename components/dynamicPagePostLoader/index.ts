import { IDynamicPagePostReturn } from "types";
import * as fs from "fs/promises";
import path from "path";
import getConfig from "next/config";
const config = getConfig();

/**
 * This function should be called in getStaticProps, it searches recursively through all of the pages in the specified directory
 * @param {string} dirPath This is the path to the directory to be scanned, it should be the url where the pages are found (like /banana or /flying/helicopters)
 * @warning This returns an empty array during dev mode, this is because this function reads the content from the static build files which aren't generated during dev mode
 */

export default async function getDynamicPagePosts<
  T extends IDynamicPagePostReturn
>(dirPath: string): Promise<T[]> {
  let files: string[] = await fs.readdir(
    path.join(config.serverRuntimeConfig.PROJECT_ROOT, "pages", dirPath)
  );

  let fileContent: { path: string; content: string }[] = [];

  for (let i in files) {
    fileContent.push({
      path: path
        .join(
          dirPath,
          path.parse(files[i]).name !== "index" ? path.parse(files[i]).name : ""
        )
        .replaceAll("\\", "/"),
      content: await fs.readFile(
        (await getFilePath(
          path
            .join(
              dirPath,
              path.parse(files[i]).name !== "index"
                ? path.parse(files[i]).name
                : ""
            )
            .replaceAll("\\", "/")
        )) || "",
        "utf8"
      ),
    });
  }

  fileContent = fileContent.filter((file) =>
    file.content.includes(".postSettings={")
  );

  for (let i in fileContent) {
    fileContent[i].content = detectObject(
      fileContent[i].content.substring(
        fileContent[i].content.indexOf(".postSettings={")
      )
    );
  }

  const objects = fileContent.map(
    (file) =>
      new Object({
        path: file.path.replace(dirPath, ""),
        ...Object.fromEntries(
          file.content
            .replace(/["]/g, "")
            .split(",")
            .map((spl) => spl.split(":"))
        ),
      })
  );

  return objects as any;
}

async function getFilePath(
  filePath: string,
  currPath: string = "/"
): Promise<string | false> {
  const files = await fs.readdir(
    path.join(
      config.serverRuntimeConfig.PROJECT_ROOT,
      ".next/static/chunks/pages",
      currPath
    )
  );

  if (filePath[0] === "/") filePath = filePath.replace("/", "");
  const dirSplit = filePath.split("/");
  const dirName = dirSplit.shift();
  filePath = dirSplit.join("/");

  if (files.includes(dirName ?? "") && dirSplit.length)
    return await getFilePath(filePath, currPath + dirName + "/");

  const filteredFiles = files.filter(
    (file) => file.startsWith(dirName ?? "") && file.endsWith(".js")
  );

  if (filteredFiles.length)
    return path.join(
      config.serverRuntimeConfig.PROJECT_ROOT,
      ".next/static/chunks/pages",
      currPath,
      filteredFiles[0]
    );

  return false;
}

function detectObject(str: string) {
  let openBrackets = -1;

  let openIndex = 0;
  let strIndex = 0;
  while (openBrackets !== 0 || strIndex >= str.length) {
    if (str[strIndex] === "{" && openBrackets === -1) {
      openBrackets = 1;
      openIndex = strIndex;
    } else if (str[strIndex] === "{") openBrackets++;
    else if (str[strIndex] === "}") openBrackets--;
    strIndex++;
  }

  return str.substring(openIndex + 1, strIndex - 1);
}
