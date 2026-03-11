import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { uidSchema } from "@/lib/validators";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const order = await prisma.order.findUnique({ where: { id: params.id }, include: { offer: true, payments: true } });
  if (!order) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ order });
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json().catch(() => ({}));

  if (body.uid !== undefined) {
    const parsed = uidSchema.safeParse(body.uid);
    if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid UID" }, { status: 400 });
    const order = await prisma.order.update({ where: { id: params.id }, data: { uid: parsed.data, status: "UID_ADDED" } });
    return NextResponse.json({ order });
  }

  if (body.status) {
    const status = String(body.status);
    if (!["DELIVERED", "FAILED"].includes(status)) return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    const order = await prisma.order.update({ where: { id: params.id }, data: { status } });
    return NextResponse.json({ order });
  }

  return NextResponse.json({ error: "Nothing to update" }, { status: 400 });
}
