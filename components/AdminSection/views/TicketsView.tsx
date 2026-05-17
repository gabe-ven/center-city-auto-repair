"use client";
import { useState } from "react";
import { Plus, Search } from "lucide-react";
import type { Ticket, TicketStatus } from "../types/admin";
import { StatusBadge } from "../components/StatusBadge";
import { TicketDetailPanel } from "../components/TicketDetailPanel";
import { CreateTicketModal } from "../components/CreateTicketModal";
import { fullVehicleLabel } from "../utils/vehicleLabel";

const FILTERS = [
  { label: "All", value: "all" },
  { label: "Received", value: "received" },
  { label: "Reviewing", value: "reviewing" },
  { label: "In Repair", value: "in_repair" },
  { label: "Ready", value: "ready" },
  { label: "Completed", value: "completed" },
] as const;

interface Props {
  tickets: Ticket[];
  onStatusChange: (id: string, status: TicketStatus) => void;
  onReload: () => void;
}

export function TicketsView({ tickets, onStatusChange, onReload }: Props) {
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Ticket | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [toast, setToast] = useState("");

  const filtered = tickets.filter((t) => {
    const matchStatus = filter === "all" || t.status === filter;
    const q = search.toLowerCase();
    const matchSearch = !q || t.id.toLowerCase().includes(q) || t.customerName.toLowerCase().includes(q) ||
      fullVehicleLabel(t).toLowerCase().includes(q) || t.customerEmail.toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 flex-shrink-0">
        <div className="font-black uppercase tracking-widest text-sm">Tickets</div>
        <button onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#27bcd9] text-black text-xs font-bold uppercase tracking-widest rounded hover:bg-[#1aa5c2] transition-colors">
          <Plus className="w-3.5 h-3.5" />New Walk-In
        </button>
      </div>

      {/* Filters + Search */}
      <div className="flex items-center gap-4 px-6 py-3 border-b border-neutral-200 dark:border-neutral-800 flex-shrink-0">
        <div className="flex gap-1">
          {FILTERS.map((f) => (
            <button key={f.value} onClick={() => setFilter(f.value)}
              className={`px-3 py-1.5 text-xs font-mono rounded transition-colors ${
                filter === f.value ? "bg-[#27bcd9] text-black" : "text-neutral-500 hover:bg-neutral-100 dark:hover:bg-white/5"
              }`}>{f.label}</button>
          ))}
        </div>
        <div className="flex-1" />
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search…"
            className="pl-8 pr-3 py-1.5 text-sm rounded border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 w-44 focus:outline-none focus:ring-2 focus:ring-[#27bcd9]/40"
          />
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
            <tr>
              {["ID", "Customer", "Vehicle", "Issues", "Date", "Status", "Tech"].map((h) => (
                <th key={h} className="text-left px-4 py-2.5 font-mono text-xs uppercase tracking-widest text-neutral-400">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
            {filtered.length === 0 ? (
              <tr><td colSpan={7} className="text-center py-16 text-neutral-400 text-sm">No tickets found</td></tr>
            ) : filtered.map((t) => (
              <tr key={t.id} onClick={() => setSelected(t)}
                className="hover:bg-neutral-50 dark:hover:bg-white/5 cursor-pointer">
                <td className="px-4 py-3 font-mono text-xs text-neutral-500">{t.id}</td>
                <td className="px-4 py-3">
                  <div>{t.customerName}</div>
                  <div className="text-xs text-neutral-400">{t.customerPhone}</div>
                </td>
                <td className="px-4 py-3 text-neutral-600 dark:text-neutral-400">{fullVehicleLabel(t)}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {t.issues.slice(0, 2).map((i) => (
                      <span key={i} className="px-1.5 py-0.5 bg-neutral-100 dark:bg-neutral-800 text-xs rounded font-mono">{i}</span>
                    ))}
                    {t.issues.length > 2 && <span className="text-xs text-neutral-400">+{t.issues.length - 2}</span>}
                  </div>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-neutral-500">
                  {t.appointmentDate || new Date(t.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <select
                    value={t.status}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => { e.stopPropagation(); onStatusChange(t.id, e.target.value as TicketStatus); }}
                    className="text-xs border-0 bg-transparent font-mono cursor-pointer focus:outline-none"
                  >
                    {["received","reviewing","in_repair","ready","completed"].map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-3 text-xs text-neutral-500">{t.assignedTo || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && (
        <TicketDetailPanel ticket={selected} onClose={() => setSelected(null)} onUpdated={() => { onReload(); showToast("Ticket updated"); }} />
      )}
      {showCreate && (
        <CreateTicketModal onClose={() => setShowCreate(false)} onCreated={() => { onReload(); showToast("Ticket created"); }} />
      )}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-[#0a0a0a] text-white px-4 py-3 rounded-lg text-sm font-mono shadow-xl">
          {toast}
        </div>
      )}
    </div>
  );
}
