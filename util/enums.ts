export enum UserAccessLevelRolesEnum {
  adm = 6,
  col = 3,
  tm = 2,
  dev = 5,
  mentor = 4,
  vis = 1,
  admin = 6,
  colead = 3,
  member = 2,
}

export const UserAccessDashboardsEnum = {
  6: "/admin",
  5: "/developer",
  4: "/mentor",
  3: "/colead",
  2: "/team",
  1: "/",
  0: "/",
};

export enum UserAccessLevelRolesDisplayNameEnum {
  "Visitor" = 1,
  "Member" = 2,
  "Colead" = 3,
  "Mentor" = 4,
  "Website Developer" = 5,
  "Administrator" = 6,
}

export enum TeamDisplayNames {
  "admin" = "Administrative",
  "build" = "Build",
  "controls" = "Controls",
  "programming" = "Programming",
  "noteam" = "No Team"
}
