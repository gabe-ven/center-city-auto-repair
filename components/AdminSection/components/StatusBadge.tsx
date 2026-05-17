"use client";
import type { TicketStatus } from "../types/admin";

const CONFIG: Record<TicketStatus, { label: string; className: string }> = {
  received:   { label: "Received",    className: "bg-blue-100 text-blue-800" },
  reviewing:  { label: "Reviewing",   className: "bg-yellow-100 text-yellow-800" },
  in_repair:  { label: "In Repair",   className: "bg-orange-100 text-orange-800" },
  ready:      { label: "Ready",       className: "bg-green-100 text-green-800" },
  completed:  { label: "Completed",   className: "bg-gray-100 text-gray-600" },
};

export function StatusBadge({ status }: { status: TicketStatus }) {
  const { label, className } = CONFIG[status] || CONFIG.received;
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-semibold font-mono uppercase tracking-wide ${className}`}>
      {label}
    </span>
  );
}
