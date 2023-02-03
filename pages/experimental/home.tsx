import Layout from "@components/layout";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from "next/image";

export default function Home() {
  return (
    <Layout title="Home">
      <Carousel>
        <div>
          <Image src="/static/images/assets/johnl.jpg" alt="John" />
        </div>
        <div>
          <Image src="/static/images/assets/johnl.jpg" alt="John" />
        </div>
      </Carousel>
    </Layout>
  );
}
