import * as fs from "fs/promises";
import path from "path";

const getImages = async (...folder: string[]) => {
  let files = await fs.readdir(
    path.join(process.cwd(), "public", "static", "images", "dynamic", ...folder)
  );

  let mappedFiles: any = await Promise.all(files.map(async (file) => {
    if ((await fs.stat(path.join(process.cwd(), "public", "static", "images", "dynamic", ...folder, file))).isDirectory()) return await getImages(path.join(...folder, file))
    return path.join("/static", "images", "dynamic", ...folder, file).replaceAll("\\", "/")
  }))
  
  mappedFiles =  removeDArray<string>(mappedFiles).filter((element) => element.startsWith("/")).map((image: any) => [path.basename(image), image])

  return mappedFiles
}

function removeDArray<T = any>(array: (T | T[])[]): T[]{
    const newArray: T[] = []

    array.forEach(element => {
        if (Array.isArray(element)) newArray.push(...removeDArray<T>(element))
        else newArray.push(element)
    })

    return newArray
}

export default getImages;
