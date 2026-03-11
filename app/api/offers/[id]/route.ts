import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const offer = await prisma.offer.findUnique({ where: { id: params.id } });
  return NextResponse.json({ offer });
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json().catch(() => null);
  if (!body?.category || !body?.title || typeof body?.price !== "number") {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
  const offer = await prisma.offer.update({
    where: { id: params.id },
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

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  await prisma.offer.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
