import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(request: NextRequest) {
  const session = await auth.api.getSession({ headers: request.headers });
  const user = session?.user;

  if (!user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const name =
    typeof body?.name === "string" ? body.name.trim().slice(0, 120) : "";

  if (!name) {
    return NextResponse.json(
      { error: "Name is required." },
      { status: 400 },
    );
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { name },
  });

  return NextResponse.json({ name });
}
