export enum UserAccessLevelRolesEnum {
  adm = 4,
  col = 2,
  tm = 1,
  dev = parseInt(process.env.DEV_ACCESS_LEVEL ?? "") ?? 4,
  vis = 0,
  admin = 4,
  colead = 2,
  member = 1,
}

export const UserAccessDashboardsEnum = {
  4: "/admin",
  3: "/developer",
  2: "/colead",
  1: "/team",
  0: "/",
};
