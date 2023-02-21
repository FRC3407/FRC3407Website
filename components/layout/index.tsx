import Footer from "../footer";
import Navbar from "../navbar";
import Head from "next/head";

export default function Layout({
  children,
  title,
  ignoreStandardContentStyle = false,
}: {
  children?: React.ReactNode;
  title: string;
  ignoreStandardContentStyle?: boolean;
}) {
  return (
    <div>
      <Head>
        <title>{title + " | FRC 3407"}</title>
      </Head>
      <Navbar />
      {ignoreStandardContentStyle ? (
        children
      ) : (
        <div className="content">{children}</div>
      )}
      <Footer />
    </div>
  );
}
