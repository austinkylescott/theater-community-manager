import type { ReactNode } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

type SessionShellProps = {
  children: ReactNode;
  redirectTo?: string;
};

export default async function SessionShell({
  children,
  redirectTo = "/signup",
}: SessionShellProps) {
  const headersList = await headers();

  const sessionResult = await auth.api.getSession({
    headers: headersList,
  });

  const isAuthenticated =
    Boolean(sessionResult?.session) || Boolean(sessionResult?.user);

  if (!isAuthenticated) {
    redirect(redirectTo);
  }

  return <>{children}</>;
}
