import Layout from "@components/layout";
import connect from "db/connection";
import FeedbackSchema from "db/schemas/feedback.schema";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import getConfig from "next/config";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { ReactNode, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import styles from "styles/pages/Feedback.module.scss";
import { DeveloperAuth } from "..";
import Pagination from "@mui/material/Pagination";
import { hexToUtf8 } from "util/formating";

enum FeedbackRatingEnum {
  "overallStarRating" = "Overall",
  "easeOfUseStarRating" = "Ease of Use",
  "speedStarRating" = "Speed",
  "visualAppealStarRating" = "Visual Appeal",
}

export default function FeedbackDisplay({
  feedback,
  error,
  date,
  buildId,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [displayBuildId, setDisplayBuildId] = useState(buildId);
  const [page, setPage] = useState(1);

  const ids = Object.keys(feedback);

  if (error || !feedback)
    return (
      <Layout title="Error">
        <h1>Error accessing Database</h1>
      </Layout>
    );

  function displaySurveyResults(results: any[]) {
    if (results.length < 1)
      return (
        <div
          style={{
            textAlign: "center",
            height: "50%",
          }}
        >
          <div className={styles.ratingsContainer}>
            {Object.entries(FeedbackRatingEnum).map(([key, displayName]) => (
              <div key={key}>
                <div className={styles.ratingContainer}>
                  <h1>{displayName}</h1>
                  <Box sx={{ position: "relative", display: "inline-flex" }}>
                    <CircularProgress
                      variant="determinate"
                      value={100}
                      size="5rem"
                      sx={{
                        color: "gray",
                      }}
                    />
                    <Box
                      sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: "absolute",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "5rem",
                        height: "5rem",
                      }}
                    >
                      <h2>--</h2>
                    </Box>
                  </Box>
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    function getColor(rating: number): "success" | "warning" | "error" {
      if (rating / 5 > 0.8) {
        return "success";
      }

      if (rating / 5 > 0.6) {
        return "warning";
      }

      return "error";
    }

    const average = Object.fromEntries(
      Object.entries(FeedbackRatingEnum).map(([key]) => [
        key,
        Math.round(
          (results.reduce((previous, current) => previous + current[key], 0) /
            results.length) *
            100
        ) / 100,
      ])
    );

    return (
      <div
        style={{
          textAlign: "center",
        }}
      >
        <div className={styles.ratingsContainer}>
          {Object.entries(FeedbackRatingEnum).map(([key, displayName]) => (
            <div key={key}>
              <div className={styles.ratingContainer}>
                <h1>{displayName}</h1>
                <Box sx={{ position: "relative", display: "inline-flex" }}>
                  <CircularProgress
                    variant="determinate"
                    value={100}
                    size="5rem"
                    sx={{
                      position: "absolute",
                      color: "gray",
                    }}
                  />
                  <CircularProgress
                    variant="determinate"
                    value={(average[key] / 5) * 100}
                    color={getColor(average[key])}
                    size="5rem"
                  />
                  <Box
                    sx={{
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                      position: "absolute",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "5rem",
                      height: "5rem",
                    }}
                  >
                    <h2>{`${average[key].toString().replace("0", "")}/5`}</h2>
                  </Box>
                </Box>
              </div>
            </div>
          ))}
        </div>
        <hr
          style={{
            margin: "20px",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            textAlign: "center",
          }}
        >
          <Pagination
            count={results.length}
            page={page}
            onChange={(event, value) => setPage(value)}
          />
          <div>
            <h3>Email: {results[page - 1].contact}</h3>
            <h3>Response ID: {results[page - 1]._id}</h3>
          </div>
          <div className={styles.feedbackResponses}>
            {Object.keys(FeedbackRatingEnum).map((key) => (
              <div key={key} className={styles.feedbackResponse}>
                <h1>
                  {FeedbackRatingEnum[key as keyof typeof FeedbackRatingEnum]}
                </h1>
                <Box sx={{ position: "relative", display: "inline-flex" }}>
                  <CircularProgress
                    variant="determinate"
                    value={100}
                    size="4rem"
                    sx={{
                      position: "absolute",
                      color: "gray",
                    }}
                  />
                  <CircularProgress
                    variant="determinate"
                    value={(results[page - 1][key] / 5) * 100}
                    color={getColor(results[page - 1][key])}
                    size="4rem"
                  />
                  <Box
                    sx={{
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                      position: "absolute",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "4rem",
                      height: "4rem",
                    }}
                  >
                    <h2>{`${results[page - 1][key]}`}</h2>
                  </Box>
                </Box>
                <h2>Feedback:</h2>
                <p>
                  {results[page - 1][key.replace("StarRating", "Feedback")] ||
                    "None provided"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <Layout title="Feedback">
      <div className={styles.devFeedbackPage}>
        <Select
          value={displayBuildId}
          onChange={(event) => {
            setDisplayBuildId(event.target.value);
            setPage(1);
          }}
        >
          <MenuItem value={buildId}>Current Build</MenuItem>
          {ids.reverse().map((id) =>
            id === buildId ? null : (
              <MenuItem key={id} value={id}>
                Build on{" "}
                {new Date(
                  hexToUtf8(id.split("-").at(-1) as string)
                ).toLocaleString()}
              </MenuItem>
            )
          )}
        </Select>

        <h3>
          Build ID:
          <br />
          <code
            style={{
              fontWeight: "100",
            }}
          >
            {buildId}
          </code>
        </h3>
        <h3>
          Total Responses:
          <br />
          {(feedback[displayBuildId] ?? []).length}
        </h3>

        {displaySurveyResults(feedback[displayBuildId] ?? []) as ReactNode}
        <p>Last Updated: {new Date(date).toLocaleString()}</p>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const config = getConfig();

    if ((await connect()) === "NO URI PROVIDED")
      return {
        props: {
          error: {
            message: "NO MONGO URI",
          },
          date: new Date(),
        },
      };

    const feedback: { [key: string]: any[] } = {};

    (
      JSON.parse(JSON.stringify(await FeedbackSchema.find().lean().exec())) as {
        [key: string]: any;
      }[]
    ).forEach((element) => {
      if (feedback[element.buildId]) {
        feedback[element.buildId].push(element);
      } else {
        feedback[element.buildId] = [element];
      }
    });

    return {
      props: {
        feedback,
        date: new Date().toISOString(),
        buildId: config.serverRuntimeConfig.buildId,
      },
    };
  } catch (error: any) {
    return { props: { error } };
  }
};

FeedbackDisplay.auth = DeveloperAuth;
