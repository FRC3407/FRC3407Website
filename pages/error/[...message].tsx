import React from "react";
import { useRouter } from "next/router";
import Layout from "../../components/layout";

export default function Error() {
  const { message = ["No Code Provided", "No Message Provided"] } =
    useRouter().query;

  let code: string = "No Code Provided";
  let displayMessage: string = "No Message Provided";

  if (message.length <= 1) {
    if (isNaN(parseInt(message[0]))) displayMessage = message[0];
    else code = message[0];
  } else {
    (Array.isArray(message) ? message : [message]).forEach((messElement) => {
      if (isNaN(parseInt(messElement))) {
        displayMessage = messElement;
      } else {
        code = messElement;
      }
    });
  }

  return (
    <Layout title={"Error: " + code}>
      <div>
        <h1>There seems to be an error :(</h1>
        <h2>Code: {code}</h2>
        <h2>Message: {displayMessage}</h2>
      </div>
    </Layout>
  );
}
