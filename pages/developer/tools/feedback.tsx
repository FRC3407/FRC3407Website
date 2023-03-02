import Layout from "@components/layout";
import connect from "db/connection";
import FeedbackSchema from "db/schemas/feedback.schema";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import getConfig from "next/config";
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import styles from "styles/pages/Feedback.module.scss"

export default function FeedbackDisplay({ feedback }: InferGetStaticPropsType<typeof getStaticProps>) {
  const [displayBuildId, setDisplayBuildId] = useState("current")

  const ids = Object.keys(feedback)

  console.log(ids)

  function displaySurveyResults(results: any[]) {
    if (results.length < 1) {
      return "No Survey Data"
    }

    function getColor(rating: number): "success"| "warning" | "error" {
      if (rating / 5 > .8) {
        return "success"
      }

      if (rating / 5 > .6) {
        return "warning"
      }

      return "error"
    }

    return <div className={styles.ratingsContainer}>{results.map(result => <div key={result._id}>
      <div className={styles.ratingContainer}>
        <h4>Overall Rating</h4>
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
          <CircularProgress variant="determinate" value={100} size="5rem" sx={{
            position: "absolute",
            color: "gray"
          }} />
          <CircularProgress variant="determinate" value={result.overallStarRating / 5 * 100} color={getColor(result.overallStarRating)} size="5rem" />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: "5rem",
              height: "5rem"
            }}
          >
            <h2>{`${result.overallStarRating.toString().replace("0", "")}/5`}</h2>
          </Box>
        </Box>
      </div>
    </div>)}</div>
  }

  return <Layout title="Feedback">
    <div className={styles.devFeedbackPage}>
    <Select value={displayBuildId} onChange={(event) => setDisplayBuildId(event.target.value)}>
      {ids.map(id => <MenuItem key={id} value={id}>{id}</MenuItem>)}
    </Select>
    
    {displaySurveyResults(feedback[displayBuildId])}
    </div>
  </Layout>
}

export const getStaticProps: GetStaticProps = async () => {

  const config = getConfig()

  if (await connect() === "NO URI PROVIDED") return {
    props: {
      error: {
        message: "NO MONGO URI"
      }
    }
  };

  const feedback: { [key: string]: any[] } = {};

  (JSON.parse(JSON.stringify(await FeedbackSchema.find().lean().exec())) as { [key: string]: any }[]).forEach(element => {
    if (feedback[element.buildId]) {
      feedback[element.buildId].push(element)
    } else {
      feedback[element.buildId] = [element]
    }
  });

  feedback.current = feedback[config.serverRuntimeConfig.buildId] ?? []

  return {
    props: {
      feedback
    }
  }
}