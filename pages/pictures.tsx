import Layout from "@components/layout";
import { GetStaticProps } from "next";
import { InferGetStaticPropsType } from "next/types";
import path from "path";
import { recursiveReadFolder } from "util/resources";
import Image from "next/image"

export default function Pictures({ images }: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log(images)
  return (
    <Layout title="Team Pictures">
      {images.map(image => <Image key={image.name} src={image.path}  height={300} width={300} alt={image.name} />)}
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<{ images: { name: string, path: string, year: number }[] }> = async () => {
  return {
    props: {
      images: (await recursiveReadFolder(path.join(process.cwd(), "public/static/images"))).filter(file => path.basename(file).startsWith("20")).map((image) => {
        return {
          name: path.basename(image).split(/[_.]/g)[1].split("-").filter(word => isNaN(parseInt(word))).join(" "),
          year: parseInt(path.basename(image).split("_")[0]),
          path: image.replace(path.join(process.cwd(), "public"), "").replaceAll("\\", "/")
        }
      })
    }
  }
}