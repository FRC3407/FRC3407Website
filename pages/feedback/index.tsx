import Layout from "@components/layout";
import TextField from "@mui/material/TextField";
export default function Feedback() {
  return <Layout title="Website Feedback">
    <form action="/api/feedback" method="PUT">
      <TextField id="Hello World" name="Hello World" />
    </form>
  </Layout>
}