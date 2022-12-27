import { IReport } from "../types/metrics";
import fs from "fs";

export async function addReport(report: IReport) {
  const content = JSON.parse(
    fs.readFileSync("public/metrics.json", "utf-8")
  ) as IReport[];
  if (content.length >= parseInt(process.env.METRIC_LOG_LENGTH_LIMIT || "100"))
    content.shift();
  content.push(report);
  fs.writeFileSync("public/metrics.json", JSON.stringify(content));
}

export function getReports() {
  return JSON.parse(
    fs.readFileSync("public/metrics.json", "utf-8")
  ) as IReport[];
}
