import { NextComponentType } from "next/dist/shared/lib/utils";
import { UserAccessLevelRolesEnum } from "../util/enums";

export interface AuthOptions {
  accessLevel?: keyof typeof UserAccessLevelRolesEnum;
  loading?: NextComponentType;
  unauthorized?: string;
  requireSignIn?: boolean;
}

export interface AuthComponent extends NextComponentType {
  auth?: AuthOptions;
}
