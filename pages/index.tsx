import Layout from "@components/layout";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image, { StaticImageData } from "next/image";
import JOHN from "public/static/images/dynamic/gallery/2022_MRI-Robot.jpg";
import MemberSaw2 from "public/static/images/dynamic/gallery/2022_Members-Using-A-Saw 2.jpg";
import BrainStorm from "public/static/images/dynamic/gallery/2023_Kickoff-Brainstorming.jpg";
import styles from "styles/pages/Home.module.scss";

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

function Home() {
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
              src="https://www.firstinspires.org/sites/default/files/first-energize/charged-up-gs-update.svg"
              alt="Charged Up Logo"
              width={315}
              height={315}
            />
          </a>
          <iframe
            className={styles.ytEmbed}
            width="auto"
            height="auto"
            src="https://www.youtube.com/embed/0zpflsYc4PA"
            title="FRC Charged Up Challenge Reveal Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
        <h1>Next Competition</h1>
        <p>
          <a href="https://frc-events.firstinspires.org/2023/MNMI">
            {" "}
            Minnesota 10,000 Lakes Regional
          </a>{" "}
          on Wednesday, March 29 to Saturday, April 1, 2023 at{" "}
          <a href="https://www.google.com/maps?q=1925+University+Avenue+SE,+Minneapolis,+MN,+USA">
            Williams Arena/The Sports Pavilion Univ of MN
          </a>
          .
        </p>
      </div>
    </Layout>
  );
}

export default Home;
