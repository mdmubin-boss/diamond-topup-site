import GlassCard from "@/components/ui/GlassCard";
import { formatBDT, formatDate } from "@/lib/format";
export default async function Page({params}:{params:{id:string}}){
  const res=await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/orders/${params.id}`,{cache:"no-store"});
  const data=await res.json();
  if(!res.ok) return <GlassCard>Not found</GlassCard>;
  const o=data.order;
  return (
    <div className="space-y-4">
      <GlassCard><div className="text-sm font-semibold">Order Details</div><div className="mt-1 text-xs text-zinc-400">{o.id}</div></GlassCard>
      <GlassCard className="space-y-2 text-sm">
        <div className="flex justify-between"><span className="text-zinc-400">Status</span><span>{o.status}</span></div>
        <div className="flex justify-between"><span className="text-zinc-400">UID</span><span>{o.uid ?? "—"}</span></div>
        <div className="flex justify-between"><span className="text-zinc-400">Total</span><span className="font-semibold">{formatBDT(o.total)}</span></div>
        <div className="flex justify-between"><span className="text-zinc-400">Created</span><span>{formatDate(o.createdAt)}</span></div>
      </GlassCard>
    </div>
  );
}
