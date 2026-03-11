import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const all = searchParams.get("all") === "1";
  const offers = await prisma.offer.findMany({
    where: category ? { category, ...(all ? {} : { active: true }) } : (all ? {} : { active: true }),
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ offers });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body?.category || !body?.title || typeof body?.price !== "number") {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
  const offer = await prisma.offer.create({
    data: {
      category: String(body.category),
      title: String(body.title),
      diamonds: body.diamonds === null || body.diamonds === undefined ? null : Number(body.diamonds),
      price: Number(body.price),
      active: Boolean(body.active ?? true),
    },
  });
  return NextResponse.json({ offer });
}
