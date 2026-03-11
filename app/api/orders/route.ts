import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { createOrderSchema } from "@/lib/validators";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const admin = searchParams.get("admin") === "1";
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    take: admin ? 200 : 50,
  });
  return NextResponse.json({
    orders: orders.map(o => ({ id: o.id, status: o.status, uid: o.uid, total: o.total, createdAt: o.createdAt })),
  });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = createOrderSchema.safeParse({ offerId: body?.offerId, quantity: body?.quantity ?? 1 });
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid" }, { status: 400 });

  const offer = await prisma.offer.findUnique({ where: { id: parsed.data.offerId } });
  if (!offer || !offer.active) return NextResponse.json({ error: "Offer not available" }, { status: 404 });

  const order = await prisma.order.create({
    data: { offerId: offer.id, quantity: parsed.data.quantity, total: offer.price * parsed.data.quantity, status: "CREATED" },
  });
  return NextResponse.json({ orderId: order.id });
}
