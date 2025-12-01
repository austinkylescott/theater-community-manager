import type { ReactNode } from "react";
import SessionShell from "@/components/auth/SessionShell";

export const dynamic = "force-dynamic";

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <SessionShell>{children}</SessionShell>;
}
