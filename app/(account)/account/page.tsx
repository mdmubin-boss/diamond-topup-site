"use client";
import GlassCard from "@/components/ui/GlassCard";
import PrimaryButton from "@/components/ui/PrimaryButton";
export default function Page(){
  async function setRole(role:"user"|"admin"|"guest"){
    await fetch("/api/auth",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({role})});
    window.location.reload();
  }
  return (
    <div className="space-y-4">
      <GlassCard>
        <div className="text-sm font-semibold">Account (Demo)</div>
        <div className="mt-2 flex flex-wrap gap-2">
          <PrimaryButton onClick={()=>setRole("user")}>Set User</PrimaryButton>
          <PrimaryButton onClick={()=>setRole("admin")}>Set Admin</PrimaryButton>
          <PrimaryButton className="bg-zinc-300" onClick={()=>setRole("guest")}>Logout</PrimaryButton>
        </div>
      </GlassCard>
    </div>
  );
}
