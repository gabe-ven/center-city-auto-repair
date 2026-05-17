"use client";
import type { LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;
  value: number | string;
  label: string;
  sub?: string;
  accent?: boolean;
}

export function StatCard({ icon: Icon, value, label, sub, accent }: Props) {
  return (
    <div className={`rounded-lg border p-5 ${accent ? "bg-[#27bcd9] border-[#1aa5c2] text-black" : "bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800"}`}>
      <div className="flex items-center justify-between mb-3">
        <span className={`text-xs font-mono font-semibold uppercase tracking-widest ${accent ? "text-black/70" : "text-neutral-500"}`}>{label}</span>
        <Icon className="w-4 h-4 opacity-50" />
      </div>
      <div className={`text-3xl font-black font-mono ${accent ? "text-black" : ""}`}>{value}</div>
      {sub && <div className={`text-xs mt-1 ${accent ? "text-black/60" : "text-neutral-400"}`}>{sub}</div>}
    </div>
  );
}
