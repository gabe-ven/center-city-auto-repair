"use client";
import { createClient } from "@/lib/supabase";
import type { Ticket, TicketStatus } from "../types/admin";

function getClient() {
  return createClient();
}

function rowToTicket(row: Record<string, unknown>): Ticket {
  return {
    id: row.id as string,
    status: row.status as TicketStatus,
    year: (row.year as string) || "",
    make: (row.make as string) || "",
    model: (row.model as string) || "",
    licensePlate: row.license_plate as string | null,
    mileage: row.mileage as string | null,
    issues: (row.issues as string[]) || [],
    customerName: (row.customer_name as string) || "",
    customerEmail: (row.customer_email as string) || "",
    customerPhone: (row.customer_phone as string) || "",
    assignedTo: row.assigned_to as string | null,
    notes: row.notes as string | null,
    appointmentDate: row.appointment_date as string | null,
    appointmentTime: row.appointment_time as string | null,
    source: (row.source as "web" | "walkin") || "web",
    createdAt: (row.created_at as string) || "",
  };
}

export async function getAllTickets(): Promise<Ticket[]> {
  const supabase = getClient();
  const { data, error } = await supabase
    .from("tickets")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data || []).map(rowToTicket);
}

export async function getTicketById(id: string): Promise<Ticket | null> {
  const supabase = getClient();
  const { data, error } = await supabase.from("tickets").select("*").eq("id", id).single();
  if (error) return null;
  return data ? rowToTicket(data) : null;
}

export async function updateTicketStatus(id: string, status: TicketStatus): Promise<void> {
  const supabase = getClient();
  const { error } = await supabase.from("tickets").update({ status }).eq("id", id);
  if (error) throw error;
}

export async function updateAssignedTo(id: string, assignedTo: string): Promise<void> {
  const supabase = getClient();
  const { error } = await supabase.from("tickets").update({ assigned_to: assignedTo }).eq("id", id);
  if (error) throw error;
}

export async function updateNotes(id: string, notes: string): Promise<void> {
  const supabase = getClient();
  const { error } = await supabase.from("tickets").update({ notes }).eq("id", id);
  if (error) throw error;
}
