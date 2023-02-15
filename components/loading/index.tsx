import Layout from "@components/layout";
import CircularProgress from "@mui/material/CircularProgress";

export default function Loading() {
  return (
    <Layout title="Loading" ignoreStandardContentStyle>
      <div className="loadingIcon">
        <CircularProgress />
      </div>
    </Layout>
  );
}
