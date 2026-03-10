"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import GlassCard from "@/components/ui/GlassCard";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { formatBDT } from "@/lib/format";
type Offer={id:string;category:string;title:string;price:number;active:boolean};
export default function Page(){
  const [offers,setOffers]=useState<Offer[]>([]);
  const [loading,setLoading]=useState(true);
  async function load(){setLoading(true); const r=await fetch("/api/offers?all=1",{cache:"no-store"}); const d=await r.json(); setOffers(d.offers??[]); setLoading(false);}
  useEffect(()=>{load();},[]);
  async function del(id:string){ if(!confirm("Delete offer?")) return; const r=await fetch(`/api/offers/${id}`,{method:"DELETE"}); const d=await r.json(); if(!r.ok) alert(d?.error||"Failed"); load(); }
  return (
    <div className="space-y-4">
      <GlassCard className="flex items-center justify-between">
        <div><div className="text-sm font-semibold">Offers</div><div className="mt-1 text-xs text-zinc-400">Real DB save (Prisma).</div></div>
        <Link href="/admin/offers/new"><PrimaryButton>Create</PrimaryButton></Link>
      </GlassCard>
      {loading && <div className="text-sm text-zinc-400">Loading...</div>}
      <div className="space-y-2">
        {offers.map(o=>(
          <GlassCard key={o.id} className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold">{o.title}</div>
              <div className="mt-1 text-xs text-zinc-400">{o.category} · {formatBDT(o.price)} · {o.active?"active":"inactive"}</div>
            </div>
            <div className="flex gap-2">
              <Link className="rounded-xl border border-zinc-800 px-3 py-2 text-sm hover:border-zinc-600" href={`/admin/offers/${o.id}/edit`}>Edit</Link>
              <button className="rounded-xl border border-zinc-800 px-3 py-2 text-sm hover:border-zinc-600" onClick={()=>del(o.id)}>Delete</button>
            </div>
          </GlassCard>
        ))}
        {!loading && offers.length===0 && <div className="text-sm text-zinc-400">No offers.</div>}
      </div>
    </div>
  );
}
