import Layout from "@components/layout";
import TextField from "@mui/material/TextField";
import Rating from "@mui/material/Rating"
import FormControl from "@mui/material/FormControl";
import styles from "styles/components/Form.module.scss"
import FormHelperText from "@mui/material/FormHelperText";
import Typography from "@mui/material/Typography"
import { useState } from "react";

export default function Feedback() {

  const [overallRating, setOverallRating] = useState<number | null>(null)

  return (
    <Layout title="Website Feedback">
      <form action="/api/feedback" method="PUT">
        <FormControl fullWidth margin={"normal"} sx={{
          textAlign: "center",
          alignItems: "center"
        }} required>
          <Typography component="h1">Overall Rating</Typography>
          <Rating id="overallRating" name="overallRating" value={overallRating} onChange={(event, newVal) => setOverallRating(newVal)} precision={0.5} />
          <FormHelperText>Your overall rating of our website out of 5 stars</FormHelperText>
        </FormControl>
        <TextField id="overallFeedback" name="overallFeedback" label="Overall Feedback" fullWidth margin={"normal"} sx={{ textAlign: "center" }} multiline />
        <div className={styles.centered}>
          <TextField type={"submit"} margin="normal" onClick={(event) => {
            if (!overallRating) {
              event.preventDefault()
            }
          }} />
        </div>
      </form>
    </Layout>
  );
}
