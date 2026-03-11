import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { submitPaymentSchema } from "@/lib/validators";
import { notify } from "@/lib/notifications";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const admin = searchParams.get("admin") === "1";
  const payments = await prisma.payment.findMany({ orderBy: { createdAt: "desc" }, take: admin ? 200 : 50 });
  return NextResponse.json({ payments });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = submitPaymentSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid" }, { status: 400 });

  const order = await prisma.order.findUnique({ where: { id: parsed.data.orderId } });
  if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });
  if (!order.uid) return NextResponse.json({ error: "UID missing" }, { status: 400 });

  try {
    const payment = await prisma.payment.create({
      data: {
        orderId: order.id,
        method: parsed.data.method,
        txnId: parsed.data.txnId,
        senderNumber: parsed.data.senderNumber,
        status: "PENDING",
      },
    });

    await prisma.order.update({ where: { id: order.id }, data: { status: "PAYMENT_SUBMITTED" } });
    await notify(null, "Payment submitted", `Order ${order.id} txn ${payment.txnId}`);

    return NextResponse.json({ ok: true, paymentId: payment.id });
  } catch (e: any) {
    const msg = String(e?.message ?? "");
    if (msg.includes("UNIQUE") || msg.includes("Unique")) {
      return NextResponse.json({ error: "Duplicate Txn ID. Please check and try again." }, { status: 409 });
    }
    return NextResponse.json({ error: "Failed to submit payment" }, { status: 500 });
  }
}
