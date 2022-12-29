import Layout from "../components/layout";

export default function _500() {
  return (
    <Layout title="500">
      <div className="centeredText">
        <h1>500 Error</h1>
        <h1>Our Server crapped itself, stand by</h1>
      </div>
    </Layout>
  );
}
