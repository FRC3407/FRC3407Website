import React from "react";
import { IDynamicPagePostOptions } from "types";
import * as fs from "fs/promises";
import path, { dirname } from "path";
import getConfig from "next/config";
const config = getConfig();

export default async function getDynamicPagePosts<
  T extends IDynamicPagePostOptions
>(dirPath: string): Promise<T[]> {
  let files: string[] = await fs.readdir(
    path.join(config.serverRuntimeConfig.PROJECT_ROOT, "pages", dirPath)
  );

  for (let i in files) {
    files[i] = await fs.readFile(
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
    );
  }

  files = files.filter((file) => file.includes("i.postSettings"));

  console.log(files);

  for (let i in files) {
    files[i] = detectObject(
      files[i].substring(files[i].indexOf("i.postSettings"))
    );
  }
  const objects = files.map((file) =>
    Object.fromEntries(
      file
        .replace(/["]/g, "")
        .split(",")
        .map((spl) => spl.split(":"))
    )
  );

  console.log(objects);

  return objects;
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
