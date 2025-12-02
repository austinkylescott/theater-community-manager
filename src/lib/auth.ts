import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";
import { InferSession, InferUser } from "better-auth";
import { magicLink } from "better-auth/plugins";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    magicLink({
      sendMagicLink: async ({ email, token, url }, request) => {
        //sendEmail to user
      },
    }),
  ],
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  user: {
    additionalFields: {
      role: {
        type: ["MANAGER", "PRODUCER", "PERFORMER"],
        required: true,
        defaultValue: Role.PERFORMER,
      },
    },
  },
});

export type AppSession = InferSession<typeof auth>;
export type AppUser = InferUser<typeof auth>;

export const hasRole = (
  user: Pick<AppUser, "role"> | null | undefined,
  roles: Role | Role[],
) => {
  const allowedRoles = Array.isArray(roles) ? roles : [roles];
  return Boolean(user && allowedRoles.includes(user.role as Role));
};
