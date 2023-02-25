import { WebClient, LogLevel } from "@slack/web-api";

export default function slack(): WebClient {
  if (typeof (global as any).slack !== "undefined")
    return (global as any).slack;
  const slack = new WebClient(process.env.SLACK_API_TOKEN);
  (global as any).slack = slack;
  return (global as any).slack;
}
