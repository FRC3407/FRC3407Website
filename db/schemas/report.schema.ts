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

export default mongoose.model<IReport>("Report", ReportSchema);
