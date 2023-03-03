import Layout from "@components/layout";
import TextField from "@mui/material/TextField";
import Rating from "@mui/material/Rating";
import FormControl from "@mui/material/FormControl";
import styles from "styles/pages/Feedback.module.scss";
import FormHelperText from "@mui/material/FormHelperText";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import { useState } from "react";
import { useSession } from "next-auth/react";
import getConfig from "next/config";
import Loading from "@components/loading";
import useSWR from "swr";
import Router from "next/router";

export default function Feedback() {
  const [overallRating, setOverallRating] = useState<number | null>(null);
  const [speedRating, setSpeedRating] = useState<number | null>(null);
  const [easeOfUseRating, setEaseOfUseRating] = useState<number | null>(null);
  const [visualAppealRating, setVisualAppealRating] = useState<number | null>(
    null
  );
  const [errorMessage, setErrorMessage] = useState<string>();

  const { data, error } = useSWR("/api/feedback/check", async (url) => {
    return await (await fetch(url)).text();
  });

  if ((Router.query.thanks && typeof data !== "string") || data === "false") {
    const config = getConfig();

    return (
      <Layout title="Thanks">
        <div className={styles.thanksPage}>
          <h1 className={styles.header}>Thanks!!!</h1>
          <p>
            We really appreciate the feedback!
            <br />
            It helps us make changes that are helpful and important!
          </p>
          <p>You are only allowed to submit this form once per build</p>
          <p>
            Build ID:
            <br />
            <code>{config.publicRuntimeConfig.buildId}</code>
          </p>
        </div>
      </Layout>
    );
  }

  if (data === undefined) {
    return <Loading />;
  }

  if (error || Router.query.error) {
    Router.push(
      `/error/${error.message ?? Router.query.error ?? "Unknown Error"}/${
        error.code ?? 400
      }`
    );
  }

  return (
    <Layout title="Website Feedback">
      <div className={styles.feedbackForm}>
        {errorMessage ? (
          <Alert
            severity="error"
            className={styles.errorMessageDiv}
            sx={{ textAlign: "center" }}
          >
            <div>{errorMessage}</div>
          </Alert>
        ) : null}
        <form action="/api/feedback" method="get">
          <FormControl
            fullWidth
            margin={"normal"}
            sx={{
              textAlign: "center",
              alignItems: "center",
            }}
            required
          >
            <Typography component="h1">Overall Rating</Typography>
            <Rating
              id="overallStarRating"
              name="overallStarRating"
              value={overallRating}
              size="large"
              onChange={(event, newVal) => setOverallRating(newVal)}
              precision={0.5}
            />
            <FormHelperText>
              Your overall rating of our website, out of 5 stars
            </FormHelperText>
          </FormControl>
          <TextField
            id="overallFeedback"
            name="overallFeedback"
            label="Overall Feedback"
            fullWidth
            margin={"normal"}
            sx={{ textAlign: "center" }}
            multiline
            helperText="Any suggestions or problems you want to tell us?"
          />
          <FormControl
            fullWidth
            margin={"normal"}
            sx={{
              textAlign: "center",
              alignItems: "center",
            }}
            required
          >
            <Typography component="h1">Speed Rating</Typography>
            <Rating
              id="speedStarRating"
              name="speedStarRating"
              value={speedRating}
              size="large"
              onChange={(event, newVal) => setSpeedRating(newVal)}
              precision={0.5}
            />
            <FormHelperText>
              Your rating of our website&apos;s speed, out of 5 stars
            </FormHelperText>
          </FormControl>
          <TextField
            id="speedFeedback"
            name="speedFeedback"
            label="Speed Feedback"
            fullWidth
            margin={"normal"}
            sx={{ textAlign: "center" }}
            multiline
            helperText="Any pages or forms that were slow?"
          />
          <FormControl
            fullWidth
            margin={"normal"}
            sx={{
              textAlign: "center",
              alignItems: "center",
            }}
            required
          >
            <Typography component="h1">Ease of Use Rating</Typography>
            <Rating
              id="easeOfUseStarRating"
              name="easeOfUseStarRating"
              value={easeOfUseRating}
              size="large"
              onChange={(event, newVal) => setEaseOfUseRating(newVal)}
              precision={0.5}
            />
            <FormHelperText>
              Your rating of our website&apos;s Ease of Use (Is our website
              intuitive), out of 5 stars
            </FormHelperText>
          </FormControl>
          <TextField
            id="easeOfUseFeedback"
            name="easeOfUseFeedback"
            label="Ease Of Use Feedback"
            fullWidth
            margin={"normal"}
            sx={{ textAlign: "center" }}
            multiline
            helperText="Anything that wasn't easy to use or had a steep learning curve?"
          />
          <FormControl
            fullWidth
            margin={"normal"}
            sx={{
              textAlign: "center",
              alignItems: "center",
            }}
            required
          >
            <Typography component="h1">Visual Appeal Rating</Typography>
            <Rating
              id="visualAppealStarRating"
              name="visualAppealStarRating"
              value={visualAppealRating}
              size="large"
              onChange={(event, newVal) => setVisualAppealRating(newVal)}
              precision={0.5}
            />
            <FormHelperText>
              Your rating of our website&apos;s Visual Appeal, out of 5 stars
            </FormHelperText>
          </FormControl>
          <TextField
            id="visualAppealFeedback"
            name="visualAppealFeedback"
            label="Visual Appeal Feedback"
            fullWidth
            margin={"normal"}
            sx={{ textAlign: "center" }}
            multiline
            helperText="What pages could be improved, is there anything we did well?"
          />
          <div className={styles.centered}>
            <TextField
              type={"submit"}
              margin="normal"
              onClick={(event) => {
                if (
                  !overallRating ||
                  !speedRating ||
                  !easeOfUseRating ||
                  !visualAppealRating
                ) {
                  event.preventDefault();
                  setErrorMessage("Please fill out all required fields");
                }
              }}
            />
          </div>
        </form>
      </div>
    </Layout>
  );
}

Feedback.auth = {
  requireSignIn: true,
  accessLevel: "vis"
};
