"use client";
import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase";
import { getAllTickets, updateTicketStatus } from "../api/adminApi";
import type { Ticket, TicketStatus } from "../types/admin";

export function useTickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const data = await getAllTickets();
      setTickets(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
    const supabase = createClient();
    const channel = supabase
      .channel("tickets-realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "tickets" }, () => load())
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [load]);

  const optimisticStatusUpdate = useCallback(
    async (id: string, status: TicketStatus) => {
      setTickets((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));
      try {
        await updateTicketStatus(id, status);
      } catch {
        await load();
      }
    },
    [load]
  );

  return { tickets, loading, reload: load, optimisticStatusUpdate };
}
