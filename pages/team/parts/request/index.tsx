import Layout from "@components/layout";
import TextField from "@mui/material/TextField";

export default function PartRequest() {
  return (
    <Layout title="Part Request">
      <form action="/api/team/parts/request">
        <TextField id="partUrl" name="partUrl" label={"Part URL"} helperText="The Andymark or Amazon URL" fullWidth />
        <TextField type="submit" />
      </form>
    </Layout>
  )
}