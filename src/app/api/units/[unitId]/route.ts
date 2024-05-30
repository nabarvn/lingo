import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import db from "@/server/db/drizzle";
import { isAdmin } from "@/lib/admin";
import { units } from "@/server/db/schema";

export const GET = async (req: Request) => {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.searchParams);

  const unitId = parseInt(searchParams.get("unitId") || "0", 10);

  if (!isAdmin()) return new NextResponse("Unauthorized", { status: 401 });

  const data = await db.query.units.findFirst({
    where: eq(units.id, unitId),
  });

  return NextResponse.json(data);
};

export const PUT = async (req: Request) => {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.searchParams);

  const unitId = parseInt(searchParams.get("unitId") || "0", 10);

  if (!isAdmin()) return new NextResponse("Unauthorized", { status: 401 });

  const body = await req.json();

  const data = await db
    .update(units)
    .set({
      ...body,
    })
    .where(eq(units.id, unitId))
    .returning();

  return NextResponse.json(data[0]);
};

export const DELETE = async (req: Request) => {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.searchParams);

  const unitId = parseInt(searchParams.get("unitId") || "0", 10);

  if (!isAdmin()) return new NextResponse("Unauthorized", { status: 401 });

  const data = await db.delete(units).where(eq(units.id, unitId)).returning();

  return NextResponse.json(data[0]);
};
