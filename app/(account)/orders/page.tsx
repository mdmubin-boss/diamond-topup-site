"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import GlassCard from "@/components/ui/GlassCard";
import { formatBDT } from "@/lib/format";

type Row={id:string;status:string;total:number;createdAt:string};
export default function Page(){
  const [rows,setRows]=useState<Row[]>([]);
  useEffect(()=>{(async()=>{const r=await fetch("/api/orders",{cache:"no-store"});const d=await r.json();setRows(d.orders??[]);})();},[]);
  return (
    <div className="space-y-4">
      <GlassCard><div className="text-sm font-semibold">My Orders</div><div className="mt-1 text-xs text-zinc-400">Demo: shows recent orders</div></GlassCard>
      <div className="space-y-3">
        {rows.map(o=>(
          <Link key={o.id} href={`/orders/${o.id}`}>
            <GlassCard className="hover:border-zinc-600">
              <div className="flex justify-between"><div className="text-sm font-semibold">{o.id.slice(0,10)}...</div><div className="text-xs text-zinc-400">{o.status}</div></div>
              <div className="mt-1 text-sm text-zinc-300">{formatBDT(o.total)}</div>
              <div className="mt-1 text-xs text-zinc-500">{new Date(o.createdAt).toLocaleString()}</div>
            </GlassCard>
          </Link>
        ))}
        {rows.length===0 && <div className="text-sm text-zinc-400">No orders.</div>}
      </div>
    </div>
  );
}
