import { NextComponentType } from "next/dist/shared/lib/utils";
import { UserAccessLevelRolesEnum } from "../util/enums";

export type AccessLevels = keyof typeof UserAccessLevelRolesEnum;

export interface IAuthOptions {
  accessLevel?: AccessLevels | AccessLevels[];
  loading?: NextComponentType;
  unauthorized?: string;
  requireSignIn?: boolean;
}

export interface ExtendedComponent extends NextComponentType {
  auth?: IAuthOptions;
}
