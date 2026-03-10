import GlassCard from "@/components/ui/GlassCard";
export default function Help(){
  return (
    <div className="space-y-4">
      <GlassCard>
        <div className="text-sm font-semibold">Help / FAQ</div>
        <div className="mt-2 text-sm text-zinc-300">1) Select offer → 2) UID → 3) Pay → 4) Submit Txn</div>
      </GlassCard>
      <GlassCard>
        <div className="text-sm font-semibold">Why Txn rejected?</div>
        <div className="mt-2 text-sm text-zinc-300">Duplicate Txn IDs are blocked by DB unique constraint.</div>
      </GlassCard>
    </div>
  );
}
