import Layout from "@components/layout";
import sponsors from "json/sponsors.json";
import Image from "next/image";
import style from "styles/pages/Sponsors.module.scss"

export default function Sponsors() {
  return (
    <Layout title="Sponsors">
      <div className={style.sponsorsContainer}>
        {sponsors.map((sponsor) => (
          <a href={sponsor.link} key={sponsor.name} className={style.sponsorImageContainer}>
            <p>{sponsor.name}</p>
            <Image
              src={sponsor.image}
              alt={`${sponsor.name} logo`}
              width={300}
              height={300}
              className={style.sponsorImage}
              style={{
                width: "auto",
                height: "auto"
              }}
              priority
              
              // fill
            />
          </a>
        ))}
      </div>
    </Layout>
  );
}
