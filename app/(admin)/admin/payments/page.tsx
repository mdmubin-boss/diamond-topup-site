"use client";
import { useEffect, useState } from "react";
import GlassCard from "@/components/ui/GlassCard";
import PrimaryButton from "@/components/ui/PrimaryButton";
type P={id:string;orderId:string;method:string;txnId:string;status:string};
export default function Page(){
  const [rows,setRows]=useState<P[]>([]);
  async function load(){const r=await fetch("/api/payments?admin=1",{cache:"no-store"}); const d=await r.json(); setRows(d.payments??[]);}
  useEffect(()=>{load();},[]);
  async function verify(paymentId:string, ok:boolean){
    const r=await fetch("/api/payments/verify",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({paymentId,ok})});
    const d=await r.json(); if(!r.ok) alert(d?.error||"Failed"); load();
  }
  return (
    <div className="space-y-4">
      <GlassCard><div className="text-sm font-semibold">Payments</div><div className="mt-1 text-xs text-zinc-400">Approve/Reject</div></GlassCard>
      <div className="space-y-2">
        {rows.map(p=>(
          <GlassCard key={p.id} className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-sm font-semibold">{p.method} · {p.status}</div>
              <div className="mt-1 text-xs text-zinc-400">Order: {p.orderId}</div>
              <div className="mt-1 text-xs text-zinc-400">Txn: {p.txnId}</div>
            </div>
            <div className="flex gap-2">
              <PrimaryButton disabled={p.status!=="PENDING"} onClick={()=>verify(p.id,true)}>Approve</PrimaryButton>
              <PrimaryButton disabled={p.status!=="PENDING"} className="bg-red-300" onClick={()=>verify(p.id,false)}>Reject</PrimaryButton>
            </div>
          </GlassCard>
        ))}
        {rows.length===0 && <div className="text-sm text-zinc-400">No payments.</div>}
      </div>
    </div>
  );
}
