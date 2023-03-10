import Layout from "@components/layout";
import { ReactNode } from "react";
import styles from "styles/pages/About.module.scss";

interface IAbout {
  title: string;
  value: string | ReactNode;
}

const aboutContainers: IAbout[] = [
  {
    title: "Team History",
    value: `We were founded in 2010 (yes, we're ${
      new Date().getFullYear() - 2010
    } years old) and we have competed in the FRC Robotics Competition every year since. We operate out of Mounds View High School and the majority of our students attend there as well.`,
  },
  {
    title: "Our Mission",
    value:
      "Are main goal is to improve the skills of our team members (Mentors and Students) to help them be more successful in their current and future endeavers in STEM.",
  },
  {
    title: "Key Team Values",
    value: (
      <ul style={{ textAlign: "left" }}>
        <li>It{"'s"} not stupid if it works</li>
        <li>
          Problem Solving is key, if you can&apos;t find another problem to fix,
          create one
        </li>
        <li>If it ain&apos;t broke, it doesn&apos;t have enough features</li>
        <li>If a hammer can&apos;t fix it, get a bigger hammer</li>
        <li>If at first, you don&apos;t succeed, call it version 1.0</li>
        <li>Don&apos;t be lazy, be energy efficient</li>
      </ul>
    ),
  },
];

function AboutContainer({
  value,
  title,
}: {
  value?: string | ReactNode;
  title: string;
}) {
  return (
    <div className={styles.aboutUsContainer}>
      <h3 className={styles.aboutUsContainerHeader}>{title}</h3>
      <div className={styles.aboutUsContent}>{value}</div>
    </div>
  );
}

export default function About() {
  return (
    <Layout title="About Us">
      <main className={styles.about}>
        <div className={styles.header}>
          <h1>About Us</h1>
        </div>
        <div className={styles.aboutTheTeam}>
          {aboutContainers.map((val) => (
            <AboutContainer
              key={val.title}
              title={val.title}
              value={val.value}
            />
          ))}
        </div>
      </main>
    </Layout>
  );
}
