import mongoose, { HydratedDocument } from "mongoose";

export interface IUserSchema {
  firstName: string;
  lastName: string;
  email: string; // Email
  team: string;
  accessLevel: number;
  isJohnLofton: boolean; // Are they John Lofton Safety Manager?
  accessExpires?: Date;
  personalData?: {
    primaryImage?: string;
    images?: string[];
    name?: string;
    description?: string;
    shortDescription?: string;
    achievements?: string[];
    yearJoined?: number;
    whyJoined?: string;
    interests?: string[];
    facts?: string[];
    career?: string;
    futurePlans?: string;
    yearsOnTeam?: number[];
    contact?: {
      github?: string;
      email?: string;
      personalSite?: string;
    };
  };
  importUrl?: string;
  displayUrl?: string;
}

const reqString = {
  required: true,
  type: String,
};

const UserSchema = new mongoose.Schema<IUserSchema>(
  {
    firstName: reqString,
    lastName: reqString,
    email: reqString,
    team: reqString,
    accessLevel: {
      type: Number,
      required: true,
      min: [0, "The Access Level must be between 0 and 6"],
      max: [6, "The Access Level must be between 0 and 6"],
    },
    isJohnLofton: {
      type: Boolean,
      default: false,
    },
    accessExpires: {
      type: Date,
      required: false,
    },
    personalData: {
      required: false,
      default: {},
      primaryImage: String,
      images: [String],
      name: String,
      description: String,
      shortDescription: {
        type: String,
        maxlength: 70,
      },
      achievements: [String],
      yearJoined: Number,
      whyJoined: String,
      interests: [String],
      facts: [String],
      career: String,
      futurePlans: String,
      yearsOnTeam: [Number],
      contact: {
        github: String,
        email: String,
        personalSite: String,
      },
    },
    importUrl: String,
    displayUrl: String,
  },
  {
    statics: {
      findOneByDisplayUrl(url: string) {
        return this.findOne({ displayUrl: url });
      },
    },
  }
);

export type IUser = HydratedDocument<IUserSchema>;

(global as any).userSchema =
  (global as any).userSchema || mongoose.model<IUserSchema>("User", UserSchema);
export default (global as any).userSchema as mongoose.Model<
  IUser,
  {},
  {},
  {},
  IUserSchema
>;
