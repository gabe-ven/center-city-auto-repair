export type TicketStatus = "received" | "reviewing" | "in_repair" | "ready" | "completed";

export interface Ticket {
  id: string;
  status: TicketStatus;
  year: string;
  make: string;
  model: string;
  licensePlate: string | null;
  mileage: string | null;
  issues: string[];
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  assignedTo: string | null;
  notes: string | null;
  appointmentDate: string | null;
  appointmentTime: string | null;
  source: "web" | "walkin";
  createdAt: string;
}

export interface TicketStats {
  total: number;
  received: number;
  reviewing: number;
  inRepair: number;
  ready: number;
  completed: number;
}
