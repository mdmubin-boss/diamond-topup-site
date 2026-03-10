"use client";
import { useEffect, useState } from "react";
import GlassCard from "@/components/ui/GlassCard";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { formatBDT } from "@/lib/format";

export default function Page({params}:{params:{id:string}}){
  const [order,setOrder]=useState<any>(null);
  async function load(){const r=await fetch(`/api/orders/${params.id}`,{cache:"no-store"}); const d=await r.json(); setOrder(d.order??null);}
  useEffect(()=>{load();},[params.id]);
  async function setStatus(status:"DELIVERED"|"FAILED"){
    const r=await fetch(`/api/orders/${params.id}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({status})});
    const d=await r.json(); if(!r.ok) alert(d?.error||"Failed"); load();
  }
  if(!order) return <GlassCard>Loading...</GlassCard>;
  return (
    <div className="space-y-4">
      <GlassCard>
        <div className="text-sm font-semibold">Order {order.id}</div>
        <div className="mt-2 text-sm text-zinc-300">Status: {order.status} · Total: {formatBDT(order.total)}</div>
      </GlassCard>
      <div className="flex gap-2">
        <PrimaryButton onClick={()=>setStatus("DELIVERED")}>Mark Delivered</PrimaryButton>
        <PrimaryButton className="bg-red-300" onClick={()=>setStatus("FAILED")}>Mark Failed</PrimaryButton>
      </div>
      <GlassCard><div className="text-xs text-zinc-400">Raw</div><pre className="mt-2 overflow-x-auto text-xs text-zinc-300">{JSON.stringify(order,null,2)}</pre></GlassCard>
    </div>
  );
}
