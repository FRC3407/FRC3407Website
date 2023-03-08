import mongoose, { HydratedDocument } from "mongoose";

const starRating = {
  required: true,
  type: Number,
  min: [0, "The Rating must be above 0"],
  max: [5, "The rating must be less than or equal to 5"],
};

const feedback = {
  required: false,
  type: String,
};

export interface IFeedbackSchema {
  contact: string;
  overallStarRating: number;
  overallFeedback?: string;
  speedStarRating: number;
  speedFeedback?: string;
  easeOfUseStarRating: number;
  easeOfUseFeedback?: string;
  visualAppealStarRating: number;
  visualAppealFeedback?: string;
  buildId: string;
}

const feedbackSchema = new mongoose.Schema<IFeedbackSchema>({
  contact: {
    type: String,
    required: true,
  },
  buildId: {
    type: String,
    required: true,
  },
  overallStarRating: starRating as any,
  overallFeedback: feedback,
  speedStarRating: starRating as any,
  speedFeedback: feedback,
  easeOfUseFeedback: feedback,
  easeOfUseStarRating: starRating as any,
  visualAppealFeedback: feedback,
  visualAppealStarRating: starRating as any,
});

export type IFeedback = HydratedDocument<IFeedbackSchema>;

(global as any).feedbackSchema =
  (global as any).feedbackSchema ||
  mongoose.model<IFeedbackSchema>("Feedback", feedbackSchema);
export default (global as any).feedbackSchema as mongoose.Model<
  IFeedback,
  {},
  {},
  {},
  IFeedbackSchema
>;
