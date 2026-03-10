import { NextRequest, NextResponse } from "next/server";
function role(req:NextRequest){
  const r=req.cookies.get("role")?.value;
  return r==="admin"||r==="user"?r:"guest";
}
export function middleware(req:NextRequest){
  const p=req.nextUrl.pathname;
  const r=role(req);
  if(p.startsWith("/admin") && r!=="admin"){
    const url=req.nextUrl.clone(); url.pathname="/login";
    return NextResponse.redirect(url);
  }
  if((p.startsWith("/orders")||p.startsWith("/account")) && r==="guest"){
    const url=req.nextUrl.clone(); url.pathname="/login";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}
export const config={matcher:["/admin/:path*","/orders/:path*","/account/:path*"]};
