import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { notify } from "@/lib/notifications";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const paymentId = body?.paymentId as string | undefined;
  const ok = Boolean(body?.ok);
  if (!paymentId) return NextResponse.json({ error: "paymentId required" }, { status: 400 });

  const payment = await prisma.payment.findUnique({ where: { id: paymentId } });
  if (!payment) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (payment.status !== "PENDING") return NextResponse.json({ error: "Already processed" }, { status: 400 });

  const updated = await prisma.payment.update({ where: { id: paymentId }, data: { status: ok ? "APPROVED" : "REJECTED" } });
  await prisma.order.update({ where: { id: updated.orderId }, data: { status: ok ? "PAYMENT_VERIFIED" : "FAILED" } });
  await notify(null, ok ? "Payment approved" : "Payment rejected", `Payment ${updated.id}`);

  return NextResponse.json({ ok: true });
}
