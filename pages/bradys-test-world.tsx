import Calendar from "@components/calendar";
import Layout from "@components/layout";

export default function BradysTestWorld() {
  return (
    <Layout title="Brady's Test World">
      <h1 className="centeredText">Brady&apos;s Test World</h1>
      <p>This page is just for testing, you can ignore it</p>

      <h1>Active Tests: </h1>
      <h2>Calendar:</h2>
      <Calendar />
    </Layout>
  );
}
