import GlassCard from "@/components/ui/GlassCard";
import CategoryGrid from "@/components/shop/CategoryGrid";
export default function Home(){
  return (
    <div className="space-y-6">
      <GlassCard>
        <h1 className="text-2xl font-semibold">Choose a Category</h1>
        <p className="mt-1 text-sm text-zinc-300">Prisma CRUD + production-ish order flow.</p>
      </GlassCard>
      <CategoryGrid/>
    </div>
  );
}
