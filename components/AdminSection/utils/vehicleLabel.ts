import type { Ticket } from "../types/admin";

export function fullVehicleLabel(ticket: Pick<Ticket, "year" | "make" | "model">): string {
  return [ticket.year, ticket.make, ticket.model].filter(Boolean).join(" ");
}
