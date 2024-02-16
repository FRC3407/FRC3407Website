import Layout from "@components/layout";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image, { StaticImageData } from "next/image";
import JOHN from "public/static/images/dynamic/gallery/2022_MRI-Robot.jpg";
import MemberSaw2 from "public/static/images/dynamic/gallery/2022_Members-Using-A-Saw-2.jpg";
import BrainStorm from "public/static/images/dynamic/gallery/2023_Kickoff-Brainstorming.jpg";
import styles from "styles/pages/Home.module.scss";
import useSWR from "swr";

export default function Home() {
  const { data, error } = useSWR(
    "/api/team/events/next",
    async (url) => await (await fetch(url)).json()
  );

  function CarouselElement({
    src,
    alt = "Team 3407 Picture",
    description,
  }: {
    src: StaticImageData;
    alt?: string;
    description?: string;
  }) {
    return (
      <div className={styles.bannerContainer}>
        <div className={styles.bannerOverlay}>
          <h1>Mounds View Robotics</h1>
          <h2>Team 3407</h2>
        </div>
        <Image src={src} alt={alt} className={styles.banner} priority />
      </div>
    );
  }

  function Banner() {
    return (
      <div>
        <Carousel autoPlay infiniteLoop showThumbs={false} interval={5000}>
          <CarouselElement src={JOHN} />
          <CarouselElement src={MemberSaw2} />
          <CarouselElement src={BrainStorm} />
        </Carousel>
      </div>
    );
  }

  function displayNextEvent() {
    if (error)
      return (
        <p>There was an error loading the next event, please try again later</p>
      );

    if (!data) return <p>No next Event</p>;

    return (
      <div>
        <p>
          <a href={data.website} target={"_blank"} rel="noreferrer">
            {data.name}
          </a>{" "}
          at{" "}
          <a href={data.gmaps_url} target={"_blank"} rel="noreferrer">
            {data.address}
          </a>
          , starting on{" "}
          {new Date(data.start_date + "T24:00:00.000+08:00").toLocaleDateString(
            "en-US",
            { timeZone: "America/New_York" }
          )}{" "}
          and ending on{" "}
          {new Date(data.end_date + "T24:00:00.000+08:00").toLocaleDateString(
            "en-US",
            { timeZone: "America/New_York" }
          )}
        </p>
      </div>
    );
  }

  return (
    <Layout title="Home" ignoreStandardContentStyle>
      <Banner />
      <div className={styles.informationContainer}>
        <h1>Who We Are</h1>
        <p className={styles.intro}>
          We are the Mounds View High School&apos;s Robotics team, Team 3407 aka
          the Wild Cards. Every year we compete in the{" "}
          <a href="https://www.firstinspires.org/about/vision-and-mission">
            FIRST
          </a>{" "}
          Robotics Competition, our team is given 6 weeks to design, prototype,
          build, test, and perfect a robot to complete the tasks required in the
          competition, we then bring our robot to the University of
          Minnesota&apos;s Williams Arena in Minneapolis Minnesota to compete
          against other teams in the FRC 10,000 Lakes Competition.
        </p>
        <p className={styles.intro}>
          We strive to teach our students skills that will not only help our
          team and robot but also help them develop skills such as programming,
          leadership, wiring, building, how to work in a team, how to work
          through problems, and an endless list of other skills that help them
          succeed in their future STEM or even non-STEM endeavors. We also work
          to encourage others to advance their knowledge of STEM fields and help
          spark the interest of the next generation of students, teachers, and
          ultimately leaders.
        </p>
      </div>
      <div className={styles.announcements}>
        <h1>Announcements</h1>
        <h2>This Years Challenge:</h2>
        <div className={styles.challenge}>
          <a
            href="https://www.firstinspires.org/robotics/frc/game-and-season"
            target={"_blank"}
            rel="noreferrer"
          >
            <Image
              src="https://www.firstinspires.org/sites/default/files/first-in-show/game-and-season/crescendo-logo.svg"
              alt="Crescendo Logo"
              width={315}
              height={315}
            />
          </a>
          <iframe
            className={styles.ytEmbed}
            width="auto"
            height="auto"
            src="https://www.youtube.com/embed/9keeDyFxzY4"
            title="2024 FIRST Robotics Competition CRESCENDO presented by Haas Game Animation"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
        <h1>Next Competition</h1>
        {displayNextEvent()}
      </div>
    </Layout>
  );
}
