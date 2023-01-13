import DynamicRobotInformationSystem from "@components/markUpFileInitalRenderer";
import getMD, { getMDFiles } from "@components/markUpFileInitalRenderer/import";
import Layout from "@components/layout";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";

export default function Robot({ data }: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <Layout title={(data.meta as { [key: string]: string}).title}>
            <DynamicRobotInformationSystem data={data} />
        </Layout>
    )
}

export const getStaticProps: GetStaticProps<{ data: Awaited<ReturnType<typeof getMD>> }, { robotId: string }> = async (content) => {
    return {
        props: {
            data: await getMD("robots/" + content.params?.robotId)
        }
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: (await getMDFiles("robots")).map((file => { return { params: { robotId: file }}})),
        fallback: false
    }
}