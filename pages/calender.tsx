import Layout from "@components/layout";
import styles from "../styles/Calender.module.scss";

export default function CalenderPage() {
  return (
    <Layout title="Calender">
      <h1>Robotics Events</h1>
      <iframe
        className={styles.calender}
        src="https://calendar.google.com/calendar/embed?src=moundsviewrobotics%40gmail.com&ctz=America%2FChicago"
      />
      <br />
      <br />
      <h1></h1>
    </Layout>
  );
}
