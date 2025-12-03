import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Login",
};

interface LoginPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Page({ searchParams }: LoginPageProps) {
  const resolvedSearchParams = await searchParams;
  const callbackParam = resolvedSearchParams?.callback;
  const reasonParam = resolvedSearchParams?.reason;
  const callback =
    typeof callbackParam === "string"
      ? callbackParam
      : Array.isArray(callbackParam)
        ? callbackParam[0]
        : null;
  const reason =
    typeof reasonParam === "string"
      ? reasonParam
      : Array.isArray(reasonParam)
        ? reasonParam[0]
        : null;

  return (
    <div className="flex min-h-svh w-full justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm callback={callback} reason={reason} />
      </div>
    </div>
  );
}
