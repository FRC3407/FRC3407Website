import { useRouter } from "next/router";
import Layout from "../../components/layout";

export default function Error() {
  const { code = "No Code Provided", message = "No Message Provided" } =
    useRouter().query;

  return (
    <Layout title={"Error: " + code}>
      <div>
        <h1>There seems to be an error :(</h1>
        <h2>Code: {code}</h2>
        <h2>Message: {message}</h2>
      </div>
    </Layout>
  );
}
