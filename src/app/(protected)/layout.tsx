import type { ReactNode } from "react";
import SessionShell from "@/components/auth/SessionShell";

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <SessionShell>{children}</SessionShell>;
}
