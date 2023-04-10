import fs from "fs/promises";
import path from "path";
import { remark } from "remark";
import html from "remark-html";
import matter from "gray-matter";

export default async function getMD<M = { [key: string]: any }>(
  file: string,
  onlyMeta: boolean = false
) {
  const fileContent = matter(
    await fs.readFile(
      path.join(process.cwd(), "public/static/md/", file + ".md"),
      "utf-8"
    )
  );

  const returnOb: { html: string; meta: M } = {} as any;
  if (!onlyMeta)
    returnOb.html = (
      await remark().use(html, { sanitize: false }).process(fileContent.content)
    ).toString();
  returnOb.meta = {
    ...(fileContent.data as M),
    year: path.basename(file).substring(0, 4),
  };

  return returnOb;
}

export async function getMDFiles(folder: string) {
  return await Promise.all(
    (await fs.readdir(path.join(process.cwd(), "public/static/md", folder)))
      .filter(
        async (file) =>
          !(
            await fs.stat(
              path.join(process.cwd(), "public/static/md", folder, file)
            )
          ).isDirectory()
      )
      .map((file) => path.parse(file).name)
  );
}
