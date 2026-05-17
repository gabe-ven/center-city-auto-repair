"use client";
import { useState, useEffect, useRef } from "react";
import { X, Car, MapPin, Phone, Clock } from "lucide-react";
import type { TicketStatus } from "./AdminSection/types/admin";

type Phase = "lookup" | "loading" | "found" | "not_found";

const STATUS_CONFIG: Record<TicketStatus, { label: string; message: string; step: number }> = {
  received:   { label: "Received",   message: "We've got your vehicle on our schedule. We'll review it shortly and reach out with any questions.", step: 1 },
  reviewing:  { label: "Reviewing",  message: "Our technician is reviewing your vehicle now. We'll have a diagnosis and estimate for you soon.", step: 2 },
  in_repair:  { label: "In Repair",  message: "Your vehicle is in the bay — our team is actively working on it. We'll call when it's ready.", step: 3 },
  ready:      { label: "Ready!",     message: "Your vehicle is ready for pickup! Stop by anytime during business hours.", step: 4 },
  completed:  { label: "Completed",  message: "Service complete. Thank you for choosing Center City Auto Repair!", step: 4 },
};

const ACTIVE_STATUSES: TicketStatus[] = ["received", "reviewing", "in_repair", "ready"];

interface TicketResult {
  id: string;
  status: TicketStatus;
  year: string;
  make: string;
  model: string;
  licensePlate: string | null;
  issues: string[];
  assignedTo: string | null;
  appointmentDate: string | null;
  appointmentTime: string | null;
  customerName: string;
}

export function TrackRepairModal({ onClose }: { onClose: () => void }) {
  const [phase, setPhase] = useState<Phase>("lookup");
  const [ticketId, setTicketId] = useState("");
  const [contact, setContact] = useState("");
  const [ticket, setTicket] = useState<TicketResult | null>(null);
  const [error, setError] = useState("");
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => { if (pollRef.current) clearInterval(pollRef.current); };
  }, []);

  async function lookup() {
    if (!ticketId.trim() || !contact.trim()) { setError("Please enter your ticket ID and email or phone."); return; }
    setError("");
    setPhase("loading");
    try {
      const res = await fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ticketId: ticketId.trim().toUpperCase(), contact: contact.trim() }),
      });
      const data = await res.json();
      if (!data.found) { setPhase("not_found"); return; }
      setTicket(data.ticket);
      setPhase("found");
      if (ACTIVE_STATUSES.includes(data.ticket.status)) {
        pollRef.current = setInterval(async () => {
          const r2 = await fetch("/api/track", {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ticketId: ticketId.trim().toUpperCase(), contact: contact.trim() }),
          });
          const d2 = await r2.json();
          if (d2.found) setTicket(d2.ticket);
        }, 20000);
      }
    } catch {
      setPhase("not_found");
    }
  }

  const config = ticket ? STATUS_CONFIG[ticket.status] : null;
  const vehicleLabel = ticket ? [ticket.year, ticket.make, ticket.model].filter(Boolean).join(" ") : "";

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-[#0a0a0a] px-6 py-5 flex items-center justify-between">
          <div>
            <div className="text-white font-black uppercase tracking-wider text-base">Track Your Repair</div>
            <div className="text-neutral-400 text-xs font-mono mt-0.5">Center City Auto Repair</div>
          </div>
          <button onClick={onClose} className="p-1.5 text-neutral-400 hover:text-white"><X className="w-4 h-4" /></button>
        </div>

        <div className="p-6">
          {phase === "lookup" && (
            <div className="space-y-4">
              <p className="text-sm text-neutral-600">Enter your ticket ID (from your confirmation email) and your email or phone number.</p>
              <div>
                <label className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-1 block">Ticket ID</label>
                <input
                  value={ticketId}
                  onChange={(e) => setTicketId(e.target.value.toUpperCase())}
                  placeholder="CCAR-1234567890"
                  className="w-full px-4 py-3 border border-neutral-200 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#27bcd9]/40"
                />
              </div>
              <div>
                <label className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-1 block">Email or Last 7 Digits of Phone</label>
                <input
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="you@email.com or 5580204"
                  className="w-full px-4 py-3 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#27bcd9]/40"
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button onClick={lookup}
                className="w-full py-3 bg-[#27bcd9] text-black font-black uppercase tracking-widest text-sm rounded-lg hover:bg-[#1aa5c2] transition-colors">
                Look Up Ticket
              </button>
            </div>
          )}

          {phase === "loading" && (
            <div className="flex flex-col items-center py-10 gap-4">
              <div className="w-8 h-8 border-2 border-[#27bcd9] border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-neutral-500 font-mono">Looking up your ticket…</p>
            </div>
          )}

          {phase === "not_found" && (
            <div className="space-y-4">
              <div className="text-center py-6">
                <div className="text-4xl mb-3">🔍</div>
                <div className="font-bold mb-2">Ticket Not Found</div>
                <p className="text-sm text-neutral-500">We couldn&apos;t find a ticket matching that ID and contact info. Please double-check your confirmation email.</p>
              </div>
              <button onClick={() => { setPhase("lookup"); setTicketId(""); setContact(""); }}
                className="w-full py-3 border border-neutral-200 text-sm font-semibold rounded-lg hover:bg-neutral-50 transition-colors">
                Try Again
              </button>
              <div className="text-center">
                <a href="tel:5307580204" className="text-[#27bcd9] text-sm font-mono hover:underline">(530) 758-0204</a>
              </div>
            </div>
          )}

          {phase === "found" && ticket && config && (
            <div className="space-y-5">
              {/* Stepper */}
              <div className="flex items-center gap-1">
                {["Received", "Reviewing", "In Repair", "Ready"].map((step, i) => {
                  const stepNum = i + 1;
                  const done = config.step >= stepNum;
                  const active = config.step === stepNum;
                  return (
                    <div key={step} className="flex items-center flex-1">
                      <div className={`flex flex-col items-center flex-1 ${i > 0 ? "" : ""}`}>
                        {i > 0 && <div className={`h-0.5 w-full mb-1 ${done ? "bg-[#27bcd9]" : "bg-neutral-200"}`} />}
                        <div className={`w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center ${
                          done ? "bg-[#27bcd9] text-black" : "bg-neutral-200 text-neutral-400"
                        }`}>{stepNum}</div>
                        <div className={`text-[9px] font-mono uppercase tracking-wide mt-1 ${active ? "text-[#27bcd9]" : "text-neutral-400"}`}>{step}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Status message */}
              <div className="bg-neutral-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`w-2 h-2 rounded-full ${ACTIVE_STATUSES.includes(ticket.status) ? "bg-[#27bcd9] animate-pulse" : "bg-neutral-400"}`} />
                  <span className="font-black uppercase tracking-wide text-sm">{config.label}</span>
                </div>
                <p className="text-sm text-neutral-600">{config.message}</p>
              </div>

              {/* Vehicle */}
              <div className="flex items-center gap-3 text-sm">
                <Car className="w-4 h-4 text-neutral-400 flex-shrink-0" />
                <div>
                  <div className="font-semibold">{vehicleLabel}</div>
                  {ticket.licensePlate && <div className="text-xs text-neutral-400 font-mono">Plate: {ticket.licensePlate}</div>}
                </div>
              </div>

              {/* Issues */}
              {ticket.issues.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {ticket.issues.map((issue) => (
                    <span key={issue} className={`px-2 py-1 rounded text-xs font-mono ${
                      config.step >= 3 ? "bg-[#27bcd9]/10 text-[#27bcd9]" : "bg-neutral-100 text-neutral-600"
                    }`}>{issue}</span>
                  ))}
                </div>
              )}

              {/* Tech + appointment */}
              {(ticket.assignedTo || ticket.appointmentDate) && (
                <div className="space-y-1.5 text-sm">
                  {ticket.assignedTo && (
                    <div className="flex items-center gap-2 text-neutral-600">
                      <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">Tech:</span>
                      {ticket.assignedTo}
                    </div>
                  )}
                  {ticket.appointmentDate && (
                    <div className="flex items-center gap-2 text-neutral-600">
                      <Clock className="w-3.5 h-3.5 text-neutral-400" />
                      {ticket.appointmentDate} {ticket.appointmentTime && `at ${ticket.appointmentTime}`}
                    </div>
                  )}
                </div>
              )}

              {/* Shop info */}
              <div className="border-t border-neutral-100 pt-4 space-y-2 text-sm text-neutral-500">
                <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5" />1180 Olive Drive, Davis CA 95616</div>
                <div className="flex items-center gap-2"><Phone className="w-3.5 h-3.5" />
                  <a href="tel:5307580204" className="text-[#27bcd9] hover:underline">(530) 758-0204</a>
                </div>
              </div>

              <button onClick={() => { setPhase("lookup"); setTicket(null); if (pollRef.current) clearInterval(pollRef.current); }}
                className="w-full py-2.5 border border-neutral-200 text-sm text-neutral-500 rounded-lg hover:bg-neutral-50 transition-colors font-mono">
                Look Up Another Ticket
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
