import * as fs from "fs/promises";
import path from "path";
import imageSize from "image-size";
import { ISizeCalculationResult } from "image-size/dist/types/interface";

const supportedFileTypes: string[] = ["png", "jpg"];

const getImages: (...folders: string[]) => Promise<
  {
    file: string;
    url: string;
    meta: {
      season: string;
      description: string;
      title: string;
      fileType: string;
      imageSize: ISizeCalculationResult;
    };
  }[]
> = async (...folder: string[]) =>
  removeDArray<string>(
    (await Promise.all(
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
    )) as any
  )
    .filter(
      (element) =>
        element.startsWith("/") &&
        supportedFileTypes.includes(
          path.extname(element).toLowerCase().replaceAll(".", "")
        )
    )
    .map((image: any) => {
      return {
        file: path.basename(image),
        url: image,
        meta: {
          season: path.basename(image).split("_")[0],
          description: "",
          title:
            path.parse(image).name.replaceAll("-", " ").split("_").at(-1) ??
            path.parse(image).name,
          fileType: path.extname(image),
          imageSize: imageSize(path.join(process.cwd(), "public", image)),
        },
      };
    });

function removeDArray<T = any>(array: (T | T[])[]): T[] {
  const newArray: T[] = [];
  array.forEach((element) => {
    if (Array.isArray(element)) newArray.push(...removeDArray<T>(element));
    else newArray.push(element);
  });
  return newArray;
}

export default getImages;
