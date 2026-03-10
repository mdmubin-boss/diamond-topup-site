import OfferListClient from "@/components/shop/OfferListClient";
import GlassCard from "@/components/ui/GlassCard";

export default async function Page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/offers?category=weekly-lite`, { cache: "no-store" });
  const data = await res.json();
  if (!res.ok) return <GlassCard>Failed to load offers.</GlassCard>;
  return <OfferListClient title="Weekly Lite" category="weekly-lite" initial={data.offers ?? []} />;
}
