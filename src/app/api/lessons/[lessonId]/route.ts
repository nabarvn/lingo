import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import db from "@/server/db/drizzle";
import { isAdmin } from "@/lib/admin";
import { lessons } from "@/server/db/schema";

export const GET = async (req: Request) => {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.searchParams);

  const lessonId = parseInt(searchParams.get("lessonId") || "0", 10);

  if (!isAdmin()) return new NextResponse("Unauthorized", { status: 401 });

  const data = await db.query.lessons.findFirst({
    where: eq(lessons.id, lessonId),
  });

  return NextResponse.json(data);
};

export const PUT = async (req: Request) => {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.searchParams);

  const lessonId = parseInt(searchParams.get("lessonId") || "0", 10);

  if (!isAdmin()) return new NextResponse("Unauthorized", { status: 401 });

  const body = await req.json();

  const data = await db
    .update(lessons)
    .set({
      ...body,
    })
    .where(eq(lessons.id, lessonId))
    .returning();

  return NextResponse.json(data[0]);
};

export const DELETE = async (req: Request) => {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.searchParams);

  const lessonId = parseInt(searchParams.get("lessonId") || "0", 10);

  if (!isAdmin()) return new NextResponse("Unauthorized", { status: 401 });

  const data = await db
    .delete(lessons)
    .where(eq(lessons.id, lessonId))
    .returning();

  return NextResponse.json(data[0]);
};
