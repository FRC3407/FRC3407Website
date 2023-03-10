import mongoose from "mongoose";

interface ITeam {
  projects: string[]; // Mongo IDs
  teamMembers: string[]; // Mongo IDs
  coleads: string[]; // Mongo IDs
  mentors: string[]; // Mongo IDs
  name: string;
  slackChannel: string; //
}

const reqStringArray = {
  type: [String],
  required: true,
};

const TeamSchema = new mongoose.Schema<ITeam>({
  projects: reqStringArray,
  teamMembers: reqStringArray,
  coleads: reqStringArray,
  mentors: reqStringArray,
  slackChannel: {
    required: true,
    type: String,
  },
  name: {
    required: true,
    type: String,
  },
});

(global as any).teamSchema =
  (global as any).teamSchema ?? mongoose.model<ITeam>("team", TeamSchema);
export default (global as any).teamSchema;
