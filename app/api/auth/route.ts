import { NextResponse } from "next/server";
export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const role = body?.role === "admin" || body?.role === "user" ? body.role : "guest";
  const res = NextResponse.json({ ok: true, role });
  if (role === "guest") res.cookies.set("role", "", { path: "/", maxAge: 0 });
  else res.cookies.set("role", role, { path: "/", sameSite: "lax", maxAge: 60 * 60 * 24 * 30 });
  return res;
}
