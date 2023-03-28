import mongoose from "mongoose";

export interface IPart {
  partName: string;
  partUrl: string;
  priority: number;
  quantity: number;
  reason: string;
  image?: string;
  user: {
    name: string;
    email: string;
    userId: mongoose.Types.ObjectId;
  };
  date: Date;
  status: number;
}

const reqString = {
  type: String,
  required: true,
};

const PartSchema = new mongoose.Schema<IPart>({
  partName: reqString,
  partUrl: reqString,
  priority: {
    max: [3, "Priority must be between 1 and 3"],
    min: [1, "Priority must be between 1 and 3"],
    required: true,
    type: Number,
  },
  quantity: {
    type: Number,
    min: [1, "Quanity must be more than 1"],
    required: true,
  },
  image: String,
  user: {
    name: reqString,
    email: reqString,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  date: {
    required: true,
    type: Date,
  },
  reason: reqString,
  status: {
    max: [1, "Status must be between -1 and 1"], // 0 = denied 1 = accepted
    min: [-1, "Status must be between -1 and 1"], // -1 = Pending
    required: true,
    type: Number,
  },
});

(global as any).partSchema =
  (global as any).partSchema ?? mongoose.model<IPart>("Part", PartSchema);
export default (global as any).partSchema;
