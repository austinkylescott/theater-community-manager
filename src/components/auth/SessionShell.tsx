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
  redirectTo = "/login",
}: SessionShellProps) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") ?? "";
  const search = headersList.get("x-search") ?? "";
  const callbackPath = pathname ? `${pathname}${search}` : null;

  const sessionResult = await auth.api.getSession({
    headers: headersList,
  });

  const isAuthenticated =
    Boolean(sessionResult?.session) || Boolean(sessionResult?.user);

  if (!isAuthenticated) {
    const destination =
      callbackPath && redirectTo
        ? `${redirectTo}${redirectTo.includes("?") ? "&" : "?"}callback=${encodeURIComponent(callbackPath)}`
        : redirectTo;
    redirect(destination);
  }

  return <>{children}</>;
}
