"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import GlassCard from "@/components/ui/GlassCard";
import { formatBDT } from "@/lib/format";
type Row={id:string;status:string;uid:string|null;total:number;createdAt:string};
export default function Page(){
  const [rows,setRows]=useState<Row[]>([]);
  useEffect(()=>{(async()=>{const r=await fetch("/api/orders?admin=1",{cache:"no-store"});const d=await r.json();setRows(d.orders??[]);})();},[]);
  return (
    <div className="space-y-4">
      <GlassCard><div className="text-sm font-semibold">Orders</div></GlassCard>
      <div className="overflow-x-auto rounded-2xl border border-zinc-800">
        <table className="w-full text-left text-sm">
          <thead className="bg-zinc-900/60 text-zinc-300"><tr><th className="p-3">Order</th><th className="p-3">Status</th><th className="p-3">UID</th><th className="p-3">Total</th></tr></thead>
          <tbody>
            {rows.map(r=>(
              <tr key={r.id} className="border-t border-zinc-800">
                <td className="p-3"><Link className="underline" href={`/admin/orders/${r.id}`}>{r.id.slice(0,8)}...</Link></td>
                <td className="p-3">{r.status}</td>
                <td className="p-3">{r.uid ?? "—"}</td>
                <td className="p-3">{formatBDT(r.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
