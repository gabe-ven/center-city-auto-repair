"use client";
import { useState } from "react";
import { X } from "lucide-react";
import type { TicketStatus } from "../types/admin";

const AUTO_ISSUES = [
  "Oil Change", "Brake Inspection", "Brake Repair", "Tire Rotation",
  "Tire Replacement", "Engine Diagnostic", "Check Engine Light",
  "A/C Service", "Heating System", "Battery Replacement",
  "Alternator", "Starter", "Transmission Service", "Suspension",
  "Alignment", "Fluid Flush", "Belts & Hoses", "Exhaust",
  "Pre-Purchase Inspection", "State Inspection", "Electrical Issue", "Other",
];

const TIME_SLOTS = ["7:30 AM", "8:30 AM", "9:30 AM", "10:30 AM", "11:30 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"];
const STATUSES: TicketStatus[] = ["received", "reviewing", "in_repair", "ready", "completed"];
const STATUS_LABELS: Record<TicketStatus, string> = {
  received: "Received", reviewing: "Reviewing", in_repair: "In Repair", ready: "Ready", completed: "Completed",
};

interface Props {
  onClose: () => void;
  onCreated: () => void;
}

export function CreateTicketModal({ onClose, onCreated }: Props) {
  const [form, setForm] = useState({
    name: "", email: "", phone: "",
    year: "", make: "", model: "", licensePlate: "", mileage: "",
    issues: [] as string[], notes: "",
    date: "", time: "", status: "received" as TicketStatus,
    assignedTo: "", sendEmail: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  function set(k: string, v: unknown) { setForm((f) => ({ ...f, [k]: v })); }
  function toggleIssue(issue: string) {
    set("issues", form.issues.includes(issue) ? form.issues.filter((i) => i !== issue) : [...form.issues, issue]);
  }

  async function submit() {
    if (!form.name || !form.year || !form.make || !form.model || form.issues.length === 0) {
      setError("Please fill in customer name, vehicle info, and at least one issue.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/admin/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: form.name, customerEmail: form.email, customerPhone: form.phone,
          year: form.year, make: form.make, model: form.model,
          licensePlate: form.licensePlate, mileage: form.mileage,
          issues: form.issues, notes: form.notes,
          appointmentDate: form.date, appointmentTime: form.time,
          status: form.status, assignedTo: form.assignedTo,
          sendEmail: form.sendEmail,
        }),
      });
      if (!res.ok) throw new Error("Failed");
      onCreated();
      onClose();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-[#111] rounded-xl border border-neutral-200 dark:border-neutral-800 w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 dark:border-neutral-800">
          <div className="font-black uppercase tracking-widest text-sm">New Walk-In Ticket</div>
          <button onClick={onClose}><X className="w-4 h-4" /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Customer */}
          <section>
            <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-3">Customer</div>
            <div className="grid grid-cols-3 gap-3">
              {([["name", "Full Name"], ["email", "Email"], ["phone", "Phone"]] as [keyof typeof form, string][]).map(([k, label]) => (
                <input key={k} placeholder={label} value={form[k] as string}
                  onChange={(e) => set(k, e.target.value)}
                  className="px-3 py-2 text-sm border border-neutral-200 dark:border-neutral-700 rounded bg-transparent focus:outline-none focus:ring-2 focus:ring-[#27bcd9]/40"
                />
              ))}
            </div>
          </section>

          {/* Vehicle */}
          <section>
            <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-3">Vehicle</div>
            <div className="grid grid-cols-3 gap-3 mb-3">
              {([["year", "Year"], ["make", "Make"], ["model", "Model"]] as [keyof typeof form, string][]).map(([k, label]) => (
                <input key={k} placeholder={label} value={form[k] as string}
                  onChange={(e) => set(k, e.target.value)}
                  className="px-3 py-2 text-sm border border-neutral-200 dark:border-neutral-700 rounded bg-transparent focus:outline-none focus:ring-2 focus:ring-[#27bcd9]/40"
                />
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3">
              {([["licensePlate", "License Plate"], ["mileage", "Mileage"]] as [keyof typeof form, string][]).map(([k, label]) => (
                <input key={k} placeholder={label} value={form[k] as string}
                  onChange={(e) => set(k, e.target.value)}
                  className="px-3 py-2 text-sm border border-neutral-200 dark:border-neutral-700 rounded bg-transparent focus:outline-none focus:ring-2 focus:ring-[#27bcd9]/40"
                />
              ))}
            </div>
          </section>

          {/* Issues */}
          <section>
            <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-3">Issues</div>
            <div className="flex flex-wrap gap-2">
              {AUTO_ISSUES.map((issue) => (
                <button key={issue} onClick={() => toggleIssue(issue)}
                  className={`px-3 py-1.5 text-xs rounded border transition-colors ${
                    form.issues.includes(issue)
                      ? "bg-[#27bcd9] border-[#27bcd9] text-black font-semibold"
                      : "border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:border-[#27bcd9]"
                  }`}>{issue}</button>
              ))}
            </div>
          </section>

          {/* Appointment */}
          <section>
            <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-3">Appointment</div>
            <div className="flex gap-3 mb-3">
              <input type="date" value={form.date} onChange={(e) => set("date", e.target.value)}
                className="px-3 py-2 text-sm border border-neutral-200 dark:border-neutral-700 rounded bg-transparent focus:outline-none focus:ring-2 focus:ring-[#27bcd9]/40"
              />
            </div>
            {form.date && (
              <div className="flex flex-wrap gap-2">
                {TIME_SLOTS.map((slot) => (
                  <button key={slot} onClick={() => set("time", slot)}
                    className={`px-3 py-1.5 text-xs rounded border transition-colors ${
                      form.time === slot ? "bg-[#27bcd9] border-[#27bcd9] text-black" : "border-neutral-200 dark:border-neutral-700 hover:border-[#27bcd9]"
                    }`}>{slot}</button>
                ))}
              </div>
            )}
          </section>

          {/* Status + Tech */}
          <section>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">Initial Status</div>
                <select value={form.status} onChange={(e) => set("status", e.target.value as TicketStatus)}
                  className="w-full px-3 py-2 text-sm border border-neutral-200 dark:border-neutral-700 rounded bg-white dark:bg-neutral-900 focus:outline-none">
                  {STATUSES.map((s) => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
                </select>
              </div>
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">Assign Tech</div>
                <input placeholder="Technician name" value={form.assignedTo} onChange={(e) => set("assignedTo", e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-neutral-200 dark:border-neutral-700 rounded bg-transparent focus:outline-none focus:ring-2 focus:ring-[#27bcd9]/40"
                />
              </div>
            </div>
          </section>

          {/* Notes */}
          <section>
            <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">Notes</div>
            <textarea value={form.notes} onChange={(e) => set("notes", e.target.value)} rows={3} placeholder="Internal notes…"
              className="w-full px-3 py-2 text-sm border border-neutral-200 dark:border-neutral-700 rounded bg-transparent focus:outline-none focus:ring-2 focus:ring-[#27bcd9]/40 resize-none"
            />
          </section>

          {/* Send email toggle */}
          {form.email && (
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={form.sendEmail} onChange={(e) => set("sendEmail", e.target.checked)}
                className="accent-[#27bcd9]" />
              Send confirmation email to customer
            </label>
          )}

          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>

        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-neutral-200 dark:border-neutral-800">
          <button onClick={onClose} className="px-4 py-2 text-sm text-neutral-500 hover:text-neutral-800 dark:hover:text-white">Cancel</button>
          <button onClick={submit} disabled={submitting}
            className="px-5 py-2 bg-[#27bcd9] text-black text-sm font-bold uppercase tracking-widest rounded hover:bg-[#1aa5c2] disabled:opacity-50 transition-colors">
            {submitting ? "Creating…" : "Create Ticket"}
          </button>
        </div>
      </div>
    </div>
  );
}
