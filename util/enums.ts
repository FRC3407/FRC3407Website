export enum UserAccessLevelRolesEnum {
  adm = 5,
  col = 3,
  tm = 2,
  dev = 4,
  vis = 1,
  admin = 5,
  colead = 3,
  member = 2,
}

export const UserAccessDashboardsEnum = {
  5: "/admin",
  4: "/developer",
  3: "/colead",
  2: "/team",
  1: "/",
  0: "/",
};

export enum UserAccessLevelRolesDisplayNameEnum {
  "Visitor" = 1,
  "Member" = 2,
  "Colead" = 3,
  "Website Developer" = 4,
  "Administrator" = 5,
}
