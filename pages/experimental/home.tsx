import Layout from "@components/layout";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image, { StaticImageData } from "next/image";
import JOHN from "public/static/images/dynamic/gallery/2022_MRI-Robot.jpg";
import MemberSaw2 from "public/static/images/dynamic/gallery/2022_Members-Using-A-Saw 2.jpg";
import BrainStorm from "public/static/images/dynamic/gallery/2023_Kickoff-Brainstorming.jpg"
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
      <Carousel autoPlay infiniteLoop showThumbs={false}>
        <CarouselElement src={JOHN} />
        <CarouselElement src={MemberSaw2} />
        <CarouselElement src={BrainStorm} />
      </Carousel>
      <div className={styles.informationContainer}>
        <h1>We are the Wild Cards</h1>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Layout title="Home" ignoreStandardContentStyle>
      <Banner />
    </Layout>
  );
}
