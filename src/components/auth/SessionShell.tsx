import type { ReactNode } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { SessionProvider } from "./session-context";

type SessionShellProps = {
  children: ReactNode;
  redirectTo?: string;
};

export default async function SessionShell({
  children,
  redirectTo = "/login",
}: SessionShellProps) {
  const headersList = new Headers(await headers());
  const rawCallback =
    headersList.get("x-pathname") ||
    headersList.get("next-url") ||
    headersList.get("referer") ||
    "";
  let callbackPath: string | null = null;
  if (rawCallback.startsWith("/")) {
    callbackPath = rawCallback;
  } else if (rawCallback.startsWith("http")) {
    try {
      const url = new URL(rawCallback);
      callbackPath = `${url.pathname}${url.search}`;
    } catch {
      callbackPath = null;
    }
  }

  const sessionResult = await auth.api.getSession({
    headers: headersList,
  });

  const user = sessionResult?.user ?? null;
  const session = sessionResult?.session ?? null;
  const isAuthenticated =
    Boolean(sessionResult?.session) || Boolean(sessionResult?.user);

  if (!isAuthenticated) {
    const searchParams = new URLSearchParams();
    searchParams.set("reason", "signin");
    if (callbackPath) {
      searchParams.set("callback", callbackPath);
    }
    const destination = `${redirectTo}${redirectTo.includes("?") ? "&" : "?"}${searchParams.toString()}`;
    redirect(destination);
  }

  return (
    <SessionProvider value={{ user, session }}>{children}</SessionProvider>
  );
}
