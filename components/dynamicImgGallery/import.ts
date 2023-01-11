import * as fs from "fs/promises";
import * as fss from "fs"
import path from "path";

const getImages = async (...folder: string[]) => {
  let mappedFiles: any = removeDArray<string>(
    await Promise.all(
      (
        await fs.readdir(
          path.join(
            process.cwd(),
            "public",
            "static",
            "images",
            "dynamic",
            ...folder
          )
        )
      ).map(async (file) =>
        (
          await fs.stat(
            path.join(
              process.cwd(),
              "public",
              "static",
              "images",
              "dynamic",
              ...folder,
              file
            )
          )
        ).isDirectory()
          ? await getImages(path.join(...folder, file))
          : path
              .join("/static", "images", "dynamic", ...folder, file)
              .replaceAll("\\", "/")
      )
    )
  )
    .filter((element) => element.startsWith("/"))
    .map((image: any) => {
      return {
        file: path.basename(image),
        url: image,
        meta: getMetaFileData(image)
      };
    });
  return mappedFiles;
};

function removeDArray<T = any>(array: (T | T[])[]): T[] {
  const newArray: T[] = [];
  array.forEach((element) => {
    if (Array.isArray(element)) newArray.push(...removeDArray<T>(element));
    else newArray.push(element);
  });
  return newArray;
}

function getMetaFileData(fpath: string) {
  return {
    season: path.basename(fpath).split("_")[0],
    description: "",
    title: path.parse(fpath).name.replaceAll("-", " ").split("_").at(-1),
    fileType: path.extname(fpath)
  }
}

export default getImages;
