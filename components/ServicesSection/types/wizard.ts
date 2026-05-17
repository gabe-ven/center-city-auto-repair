export type TicketStatus = "received" | "reviewing" | "in_repair" | "ready" | "completed";

export interface WizardImage {
  file: File;
  preview: string;
}

export interface WizardState {
  step: number;
  year: string | null;
  make: string | null;
  model: string | null;
  licensePlate: string | null;
  mileage: string | null;
  issues: string[];
  images: WizardImage[];
  appointment: { date: string | null; timeSlot: string | null };
  customer: { name: string; email: string; phone: string };
  notes: string;
  submittedTicketId: string | null;
}
