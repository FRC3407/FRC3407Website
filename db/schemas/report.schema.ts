import mongoose from "mongoose";
import { IReport } from "types/metrics";

const reqString = {
  type: String,
  required: true,
};

const ReportSchema = new mongoose.Schema<IReport>({
  path: reqString,
  id: reqString,
  startTime: {
    type: Number,
    required: false,
  },
  value: reqString,
  label: reqString,
});

(global as any).schema = (global as any).schema ?? mongoose.model<IReport>("Report", ReportSchema);
export default (global as any).schema
