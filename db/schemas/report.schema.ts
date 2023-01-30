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

(global as any).reportSchema =
  (global as any).reportSchema ??
  mongoose.model<IReport>("Report", ReportSchema);
export default (global as any).reportSchema;
