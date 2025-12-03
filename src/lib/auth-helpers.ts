import type { Role } from "@prisma/client";
import type { AppUser } from "./auth";

export const hasRole = (
  user: Pick<AppUser, "role"> | null | undefined,
  roles: Role | Role[],
) => {
  const allowedRoles = Array.isArray(roles) ? roles : [roles];
  return Boolean(user && allowedRoles.includes(user.role as Role));
};
