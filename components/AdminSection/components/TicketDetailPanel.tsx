"use client";
import { useState, useRef } from "react";
import { X, Car, User, Phone, Mail, CalendarDays, ClipboardList, Save } from "lucide-react";
import type { Ticket, TicketStatus } from "../types/admin";
import { StatusBadge } from "./StatusBadge";
import { updateTicketStatus, updateAssignedTo, updateNotes } from "../api/adminApi";
import { fullVehicleLabel } from "../utils/vehicleLabel";

const STATUSES: TicketStatus[] = ["received", "reviewing", "in_repair", "ready", "completed"];
const STATUS_LABELS: Record<TicketStatus, string> = {
  received: "Received", reviewing: "Reviewing", in_repair: "In Repair", ready: "Ready", completed: "Completed",
};

interface Props {
  ticket: Ticket;
  onClose: () => void;
  onUpdated: () => void;
}

export function TicketDetailPanel({ ticket, onClose, onUpdated }: Props) {
  const [savingNotes, setSavingNotes] = useState(false);
  const [notesSaved, setNotesSaved] = useState(false);
  const [notes, setNotes] = useState(ticket.notes || "");
  const [assignee, setAssignee] = useState(ticket.assignedTo || "");
  const notesTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  async function handleStatusChange(status: TicketStatus) {
    await updateTicketStatus(ticket.id, status);
    onUpdated();
  }

  async function handleAssigneeBlur() {
    if (assignee !== ticket.assignedTo) {
      await updateAssignedTo(ticket.id, assignee);
      onUpdated();
    }
  }

  async function handleNotesBlur() {
    if (notes === (ticket.notes || "")) return;
    setSavingNotes(true);
    await updateNotes(ticket.id, notes);
    setSavingNotes(false);
    setNotesSaved(true);
    if (notesTimer.current) clearTimeout(notesTimer.current);
    notesTimer.current = setTimeout(() => setNotesSaved(false), 2000);
    onUpdated();
  }

  return (
    <div className="fixed inset-y-0 right-0 w-[420px] bg-white dark:bg-[#111] border-l border-neutral-200 dark:border-neutral-800 flex flex-col shadow-2xl z-50">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <div className="text-xs font-mono text-neutral-400 uppercase tracking-widest mb-1">{ticket.id}</div>
          <div className="font-black uppercase tracking-wide text-sm">{fullVehicleLabel(ticket)}</div>
        </div>
        <button onClick={onClose} className="p-1.5 text-neutral-400 hover:text-neutral-800 dark:hover:text-white">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        {/* Status */}
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">Status</div>
          <div className="flex flex-wrap gap-2">
            {STATUSES.map((s) => (
              <button
                key={s}
                onClick={() => handleStatusChange(s)}
                className={`px-3 py-1.5 text-xs font-semibold rounded border transition-colors ${
                  ticket.status === s
                    ? "bg-[#27bcd9] border-[#27bcd9] text-black"
                    : "border-neutral-200 dark:border-neutral-700 text-neutral-500 hover:border-[#27bcd9] hover:text-[#27bcd9]"
                }`}
              >
                {STATUS_LABELS[s]}
              </button>
            ))}
          </div>
        </div>

        {/* Customer */}
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">Customer</div>
          <div className="space-y-1 text-sm">
            <div className="flex items-center gap-2"><User className="w-3.5 h-3.5 text-neutral-400" />{ticket.customerName}</div>
            <div className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-neutral-400" />
              <a href={`tel:${ticket.customerPhone}`} className="text-[#27bcd9]">{ticket.customerPhone}</a>
            </div>
            <div className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-neutral-400" />
              <a href={`mailto:${ticket.customerEmail}`} className="text-[#27bcd9] truncate">{ticket.customerEmail}</a>
            </div>
          </div>
        </div>

        {/* Vehicle */}
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">Vehicle</div>
          <div className="space-y-1 text-sm">
            <div className="flex items-center gap-2"><Car className="w-3.5 h-3.5 text-neutral-400" />{fullVehicleLabel(ticket)}</div>
            {ticket.licensePlate && <div className="text-neutral-500">Plate: {ticket.licensePlate}</div>}
            {ticket.mileage && <div className="text-neutral-500">Mileage: {ticket.mileage}</div>}
          </div>
        </div>

        {/* Issues */}
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">Issues</div>
          <div className="flex flex-wrap gap-1.5">
            {ticket.issues.map((issue) => (
              <span key={issue} className="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 text-xs rounded font-mono">{issue}</span>
            ))}
          </div>
        </div>

        {/* Appointment */}
        {ticket.appointmentDate && (
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">Appointment</div>
            <div className="flex items-center gap-2 text-sm">
              <CalendarDays className="w-3.5 h-3.5 text-neutral-400" />
              {ticket.appointmentDate} {ticket.appointmentTime && `at ${ticket.appointmentTime}`}
            </div>
          </div>
        )}

        {/* Assignee */}
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">Assigned Tech</div>
          <input
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
            onBlur={handleAssigneeBlur}
            placeholder="Unassigned"
            className="w-full px-3 py-2 text-sm border border-neutral-200 dark:border-neutral-700 rounded bg-transparent focus:outline-none focus:ring-2 focus:ring-[#27bcd9]/40"
          />
        </div>

        {/* Notes */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="text-xs font-mono uppercase tracking-widest text-neutral-400">Notes</div>
            {savingNotes && <Save className="w-3 h-3 text-neutral-400 animate-pulse" />}
            {notesSaved && <span className="text-xs text-[#27bcd9] font-mono">Saved</span>}
          </div>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            onBlur={handleNotesBlur}
            rows={4}
            placeholder="Internal notes…"
            className="w-full px-3 py-2 text-sm border border-neutral-200 dark:border-neutral-700 rounded bg-transparent focus:outline-none focus:ring-2 focus:ring-[#27bcd9]/40 resize-none"
          />
        </div>

        {/* Meta */}
        <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800 text-xs text-neutral-400 font-mono space-y-1">
          <div>Ticket ID: {ticket.id}</div>
          <div>Source: {ticket.source}</div>
          <div>Created: {new Date(ticket.createdAt).toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
}
