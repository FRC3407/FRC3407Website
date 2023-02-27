import Layout from "@components/layout";
import TextField from "@mui/material/TextField";
import Rating from "@mui/material/Rating"
import FormControl from "@mui/material/FormControl";
import styles from "styles/components/Form.module.scss"
import FormHelperText from "@mui/material/FormHelperText";
import Typography from "@mui/material/Typography"
import Alert from "@mui/material/Alert"
import { useState } from "react";

export default function Feedback() {

  const [overallRating, setOverallRating] = useState<number | null>(null)
  const [errorMessage, setErrorMessage] = useState<string>()

  console.log(errorMessage)

  return (
    <Layout title="Website Feedback">
      {errorMessage ? <Alert severity="error" className={styles.errorMessageDiv} sx={{ textAlign: "center" }}><div>{errorMessage}</div></Alert> : null}
      <form action="/api/feedback" method="PUT">
        <FormControl fullWidth margin={"normal"} sx={{
          textAlign: "center",
          alignItems: "center"
        }} required>
          <Typography component="h1">Overall Rating</Typography>
          <Rating id="overallRating" name="overallRating" value={overallRating} size="large" onChange={(event, newVal) => setOverallRating(newVal)} precision={0.5} />
          <FormHelperText>Your overall rating of our website out of 5 stars</FormHelperText>
        </FormControl>
        <TextField id="overallFeedback" name="overallFeedback" label="Overall Feedback" fullWidth margin={"normal"} sx={{ textAlign: "center" }} multiline helperText="Any suggestions or problems you want to tell us?" />
        <div className={styles.centered}>
          <TextField type={"submit"} margin="normal" onClick={(event) => {
            if (!overallRating) {
              event.preventDefault()
              setErrorMessage("Please fill out all required fields")
            }
          }} />
        </div>
      </form>
    </Layout>
  );
}
