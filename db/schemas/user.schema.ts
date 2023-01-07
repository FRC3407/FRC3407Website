import mongoose, { HydratedDocument } from "mongoose";

interface IUserSchema {
  firstName: string;
  lastName: string;
  email: string; // Email
  teams: string[]; // Team Mongo ID
  accessLevel: number;
  isJohnLofton: boolean; // Are they John Lofton Safety Manager?
  virtuals: {};
}

const reqString = {
  required: true,
  type: String,
};

const UserSchema = new mongoose.Schema<IUserSchema>({
  firstName: reqString,
  lastName: reqString,
  email: reqString,
  teams: {
    type: [String],
    required: true,
  },
  accessLevel: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  isJohnLofton: {
    type: Boolean,
    default: false,
  },
});

export type IUser = HydratedDocument<IUserSchema>;
export default mongoose.model<IUserSchema>("user", UserSchema);
