import Layout from "@components/layout";
import sponsors from "json/sponsors.json"
import Image from "next/image"

export default function Sponsors() {
  return (
    <Layout title="Sponsors">
      {sponsors.map(sponsor => <div key={sponsor.name}><Image src={sponsor.image} alt={`${sponsor.name} logo`} width={40} height={40} /></div>)}
    </Layout>
  );
}
