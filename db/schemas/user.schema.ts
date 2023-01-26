import mongoose, { HydratedDocument } from "mongoose";

interface IUserSchema {
  firstName: string;
  lastName: string;
  email: string; // Email
  teams: string[]; // Team Mongo ID
  accessLevel: number;
  isJohnLofton: boolean; // Are they John Lofton Safety Manager?
  accessExpires?: Date;
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
    min: [0, "The Access Level must be between 0 and 5"],
    max: [5, "The Access Level must be between 0 and 5"],
  },
  isJohnLofton: {
    type: Boolean,
    default: false,
  },
  accessExpires: {
    type: Date,
    required: false
  }
});

export type IUser = HydratedDocument<IUserSchema>;

(global as any).schema = (global as any).schema || mongoose.model<IUserSchema>('User', UserSchema);
export default (global as any).schema as mongoose.Model<IUser, {}, {}, {}, IUserSchema>;
