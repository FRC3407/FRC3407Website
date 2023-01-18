import Layout from "@components/layout";
import { useRouter } from "next/router";

export default function CalendarEvent() {
    const router = useRouter()
    console.log(router)
    return (
        <Layout title="Event">
            {router.query.id ?? "No Id"}
        </Layout>
    )
}