import Layout from "@components/layout";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useRouter } from "next/router";
import Alert from "@mui/material/Alert"
import { useEffect, useState } from "react";
import Loading from "@components/loading";

export default function PartRequest() {

  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (typeof router !== "undefined") setLoading(false)
  }, [router])

  if (loading) return <Loading />

  return (
    <Layout title="Part Request">
      <form action="/api/team/parts/request" style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}>
        {(router.query.success) ? <Alert>Part Request Submited!</Alert> : (router.query.error) ? <Alert severity="error">Error: {router.query.error}</Alert> : null}
        <h1>Part Request</h1>
        <TextField id="partName" name="partName" label={"Part Name"} helperText="The Part Name" fullWidth margin="normal" required />
        <TextField id="partUrl" name="partUrl" label={"Part URL"} helperText="The Andymark or Amazon URL" fullWidth margin="normal" required />
        <TextField id="reason" name="reason" label={"Reason"} helperText="Why do we need the part?" fullWidth margin="normal" required />
        <TextField id="quantity" name="quantity" label={"Quantity"} inputProps={{
          min: 1
        }} helperText="How many do we need" fullWidth margin="normal" required type={"number"} defaultValue={1} />
        <TextField select fullWidth margin="normal" required id="priority" name="priority" defaultValue={1} label="Priority" helperText="How fast do we need the part?">
          <MenuItem value={1}>Low</MenuItem>
          <MenuItem value={2}>Medium</MenuItem>
          <MenuItem value={3}>High</MenuItem>
        </TextField>
        <TextField type="submit" />
      </form>
    </Layout>
  )
}

PartRequest.auth = {
  accessLevel: "tm"
}