import Calendar from "@components/calendar";
import Layout from "@components/layout";

export default function UserCalender() {
  return (
    <Layout title="Calendar">
      <Calendar unit={"month"} />
    </Layout>
  );
}
