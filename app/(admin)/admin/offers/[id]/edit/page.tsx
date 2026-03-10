import GlassCard from "@/components/ui/GlassCard";
import OfferForm from "@/components/admin/OfferForm";

async function getOffer(id:string){
  const r=await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/offers/${id}`,{cache:"no-store"});
  return r.json();
}

export default async function Page({params}:{params:{id:string}}){
  const data=await getOffer(params.id);
  if(!data.offer) return <GlassCard>Not found</GlassCard>;
  return (
    <div className="space-y-4">
      <GlassCard><div className="text-sm font-semibold">Edit Offer</div><div className="mt-1 text-xs text-zinc-400">{params.id}</div></GlassCard>
      <OfferForm offerId={params.id} initial={data.offer}/>
    </div>
  );
}
