"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { signInWithGitHub, signUpWithEmail } from "@/lib/auth-client";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const signupSchema = z
  .object({
    name: z.string().trim().min(1, "Name is required"),
    email: z.email("Enter a valid email").trim(),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setFieldErrors({});
    const parsed = signupSchema.safeParse({
      name,
      email,
      password,
      confirmPassword,
    });

    if (!parsed.success) {
      const flattened = parsed.error.flatten().fieldErrors;
      setFieldErrors({
        name: flattened.name?.[0],
        email: flattened.email?.[0],
        password: flattened.password?.[0],
        confirmPassword: flattened.confirmPassword?.[0],
      });
      return;
    }

    const cleanedName = parsed.data.name.trim();

    try {
      setIsSubmitting(true);
      await signUpWithEmail({ email, password, name: cleanedName });
      router.push("/theaters");
      router.refresh();
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Sign up failed. Please try again.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGitHub = () => {
    signInWithGitHub().catch(() => undefined);
  };

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
              {fieldErrors.name ? (
                <p className="text-sm text-red-600">{fieldErrors.name}</p>
              ) : null}
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
              {fieldErrors.email ? (
                <p className="text-sm text-red-600">{fieldErrors.email}</p>
              ) : null}
              <FieldDescription>
                We&apos;ll use this to contact you. We will not share your email
                with anyone else.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
              {fieldErrors.password ? (
                <p className="text-sm text-red-600">{fieldErrors.password}</p>
              ) : null}
              <FieldDescription>
                Must be at least 8 characters long.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirm Password
              </FieldLabel>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                required
              />
              {fieldErrors.confirmPassword ? (
                <p className="text-sm text-red-600">
                  {fieldErrors.confirmPassword}
                </p>
              ) : null}
              <FieldDescription>Please confirm your password.</FieldDescription>
            </Field>
            <FieldGroup>
              <Field>
                {error ? <p className="text-sm text-red-600">{error}</p> : null}
              </Field>
              <Field className="flex flex-col gap-2">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Creating account..." : "Create Account"}
                </Button>
                <Button variant="outline" type="button" onClick={handleGitHub}>
                  Sign up with GitHub
                </Button>
                <FieldDescription className="px-6 text-center">
                  Already have an account? <a href="/login">Log in</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
