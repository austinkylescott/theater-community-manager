"use client";

import type { ReactNode } from "react";
import { createContext, useContext } from "react";
import type { AppSession, AppUser } from "@/lib/auth";

type SessionContextValue = {
  user: AppUser | null;
  session: AppSession | null;
};

const SessionContext = createContext<SessionContextValue>({
  user: null,
  session: null,
});

type SessionProviderProps = {
  value: SessionContextValue;
  children: ReactNode;
};

export function SessionProvider({ value, children }: SessionProviderProps) {
  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

export const useSessionContext = () => useContext(SessionContext);
