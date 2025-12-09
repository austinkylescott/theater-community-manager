"use client";

import type { ReactNode } from "react";
import { hasRole } from "@/lib/auth-helpers";
import { useSessionContext } from "./session-context";

type RoleGateProps = {
  roles: Parameters<typeof hasRole>[1];
  children: ReactNode;
  fallback?: ReactNode;
};

export function RoleGate({ roles, children, fallback = null }: RoleGateProps) {
  const { user } = useSessionContext();
  return hasRole(user, roles) ? <>{children}</> : <>{fallback}</>;
}
