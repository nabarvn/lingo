import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import db from "@/server/db/drizzle";
import { isAdmin } from "@/lib/admin";
import { courses } from "@/server/db/schema";

export const GET = async (req: Request) => {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.searchParams);

  const courseId = parseInt(searchParams.get("courseId") || "0", 10);

  if (!isAdmin()) return new NextResponse("Unauthorized", { status: 401 });

  const data = await db.query.courses.findFirst({
    where: eq(courses.id, courseId),
  });

  return NextResponse.json(data);
};

export const PUT = async (req: Request) => {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.searchParams);

  const courseId = parseInt(searchParams.get("courseId") || "0", 10);

  if (!isAdmin()) return new NextResponse("Unauthorized", { status: 401 });

  const body = await req.json();

  const data = await db
    .update(courses)
    .set({
      ...body,
    })
    .where(eq(courses.id, courseId))
    .returning();

  return NextResponse.json(data[0]);
};

export const DELETE = async (req: Request) => {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.searchParams);

  const courseId = parseInt(searchParams.get("courseId") || "0", 10);

  if (!isAdmin()) return new NextResponse("Unauthorized", { status: 401 });

  const data = await db
    .delete(courses)
    .where(eq(courses.id, courseId))
    .returning();

  return NextResponse.json(data[0]);
};
