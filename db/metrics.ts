import { IReport } from "../types/metrics";
import fs from "fs";
import getConfig from "next/config";
import path from "path";
const config = getConfig() as {
  serverRuntimeConfig: {
    PROJECT_ROOT: string;
  };
};
const metricsPath = path.join(
  config.serverRuntimeConfig.PROJECT_ROOT,
  "json",
  "metrics.json"
);

export async function addReport(report: IReport) {
  console.log(fs.readdirSync(config.serverRuntimeConfig.PROJECT_ROOT));
  const content = JSON.parse(
    fs.readFileSync(metricsPath, "utf-8")
  ) as IReport[];
  if (content.length >= parseInt(process.env.METRIC_LOG_LENGTH_LIMIT || "100"))
    content.shift();
  content.push(report);
  fs.writeFileSync(metricsPath, JSON.stringify(content));
}

export function getReports() {
  return JSON.parse(fs.readFileSync(metricsPath, "utf-8")) as IReport[];
}
