"use client";
import { Ticket, Car, Wrench, CheckCircle, Clock } from "lucide-react";
import { StatCard } from "../components/StatCard";
import { StatusBadge } from "../components/StatusBadge";
import type { Ticket as TicketType } from "../types/admin";
import { fullVehicleLabel } from "../utils/vehicleLabel";

interface Props { tickets: TicketType[] }

export function OverviewView({ tickets }: Props) {
  const today = new Date().toISOString().split("T")[0];
  const todayAppts = tickets.filter((t) => t.appointmentDate === today).sort((a, b) =>
    (a.appointmentTime || "").localeCompare(b.appointmentTime || "")
  );

  const counts = {
    total: tickets.length,
    received: tickets.filter((t) => t.status === "received").length,
    inRepair: tickets.filter((t) => t.status === "in_repair").length,
    ready: tickets.filter((t) => t.status === "ready").length,
    completed: tickets.filter((t) => t.status === "completed").length,
  };

  const statusOrder = ["received", "reviewing", "in_repair", "ready", "completed"] as const;

  return (
    <div className="p-6 space-y-8 max-w-5xl">
      <div>
        <h2 className="text-lg font-black uppercase tracking-widest mb-1">Shop Overview</h2>
        <p className="text-sm text-neutral-500">{new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard icon={Ticket} value={counts.total} label="Total Tickets" accent />
        <StatCard icon={Clock} value={counts.received} label="New" sub="awaiting review" />
        <StatCard icon={Wrench} value={counts.inRepair} label="In Bay" sub="active repairs" />
        <StatCard icon={CheckCircle} value={counts.ready} label="Ready" sub="awaiting pickup" />
      </div>

      {/* Today's appointments */}
      <div>
        <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-3">Today&apos;s Appointments</div>
        {todayAppts.length === 0 ? (
          <div className="text-sm text-neutral-400 py-8 text-center border border-dashed border-neutral-200 dark:border-neutral-800 rounded-lg">
            No appointments scheduled for today
          </div>
        ) : (
          <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900">
                  <th className="text-left px-4 py-2.5 font-mono text-xs uppercase tracking-widest text-neutral-400">Time</th>
                  <th className="text-left px-4 py-2.5 font-mono text-xs uppercase tracking-widest text-neutral-400">Customer</th>
                  <th className="text-left px-4 py-2.5 font-mono text-xs uppercase tracking-widest text-neutral-400">Vehicle</th>
                  <th className="text-left px-4 py-2.5 font-mono text-xs uppercase tracking-widest text-neutral-400">Status</th>
                  <th className="text-left px-4 py-2.5 font-mono text-xs uppercase tracking-widest text-neutral-400">Tech</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                {todayAppts.map((t) => (
                  <tr key={t.id} className="hover:bg-neutral-50 dark:hover:bg-white/5">
                    <td className="px-4 py-3 font-mono text-xs text-neutral-500">{t.appointmentTime || "—"}</td>
                    <td className="px-4 py-3">{t.customerName}</td>
                    <td className="px-4 py-3 text-neutral-600 dark:text-neutral-400">{fullVehicleLabel(t)}</td>
                    <td className="px-4 py-3"><StatusBadge status={t.status} /></td>
                    <td className="px-4 py-3 text-neutral-500">{t.assignedTo || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Status breakdown */}
      <div>
        <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-3">Status Breakdown</div>
        <div className="flex gap-0 rounded-lg overflow-hidden h-5 border border-neutral-200 dark:border-neutral-800">
          {counts.total === 0 ? (
            <div className="flex-1 bg-neutral-100 dark:bg-neutral-800" />
          ) : (
            statusOrder.map((s) => {
              const n = tickets.filter((t) => t.status === s).length;
              if (n === 0) return null;
              const colors: Record<string, string> = {
                received: "bg-blue-400", reviewing: "bg-yellow-400",
                in_repair: "bg-orange-400", ready: "bg-green-400", completed: "bg-neutral-400",
              };
              return (
                <div key={s} className={`${colors[s]} transition-all`} style={{ flex: n }} title={`${s}: ${n}`} />
              );
            })
          )}
        </div>
        <div className="flex gap-4 mt-2">
          {statusOrder.map((s) => {
            const n = tickets.filter((t) => t.status === s).length;
            const colors: Record<string, string> = {
              received: "bg-blue-400", reviewing: "bg-yellow-400",
              in_repair: "bg-orange-400", ready: "bg-green-400", completed: "bg-neutral-400",
            };
            const labels: Record<string, string> = {
              received: "Received", reviewing: "Reviewing", in_repair: "In Repair", ready: "Ready", completed: "Done",
            };
            return (
              <div key={s} className="flex items-center gap-1.5 text-xs text-neutral-500">
                <span className={`w-2 h-2 rounded-sm ${colors[s]}`} />
                {labels[s]}: {n}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
