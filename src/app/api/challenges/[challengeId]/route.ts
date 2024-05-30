import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import db from "@/server/db/drizzle";
import { isAdmin } from "@/lib/admin";
import { challenges } from "@/server/db/schema";

export const GET = async (req: Request) => {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.searchParams);

  const challengeId = parseInt(searchParams.get("challengeId") || "0", 10);

  if (!isAdmin()) return new NextResponse("Unauthorized", { status: 401 });

  const data = await db.query.challenges.findFirst({
    where: eq(challenges.id, challengeId),
  });

  return NextResponse.json(data);
};

export const PUT = async (req: Request) => {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.searchParams);

  const challengeId = parseInt(searchParams.get("challengeId") || "0", 10);

  if (!isAdmin()) return new NextResponse("Unauthorized", { status: 403 });

  const body = await req.json();

  const data = await db
    .update(challenges)
    .set({
      ...body,
    })
    .where(eq(challenges.id, challengeId))
    .returning();

  return NextResponse.json(data[0]);
};

export const DELETE = async (req: Request) => {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.searchParams);

  const challengeId = parseInt(searchParams.get("challengeId") || "0", 10);

  if (!isAdmin()) return new NextResponse("Unauthorized", { status: 401 });

  const data = await db
    .delete(challenges)
    .where(eq(challenges.id, challengeId))
    .returning();

  return NextResponse.json(data[0]);
};
