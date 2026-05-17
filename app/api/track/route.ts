import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getDb() { return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!); }

const NOT_FOUND = NextResponse.json({ found: false });

export async function POST(req: NextRequest) {
  try {
    const { ticketId, contact } = await req.json();
    if (!ticketId || !contact) return NOT_FOUND;

    const supabase = getDb();
    const { data, error } = await supabase.from("tickets").select(
      "id, status, year, make, model, license_plate, issues, assigned_to, appointment_date, appointment_time, customer_name, customer_email, customer_phone"
    ).eq("id", ticketId.trim().toUpperCase()).single();

    if (error || !data) return NOT_FOUND;

    // Validate contact: email match OR last-7-digit phone match
    const c = contact.trim().toLowerCase();
    const emailMatch = data.customer_email?.toLowerCase() === c;
    const last7 = (data.customer_phone || "").replace(/\D/g, "").slice(-7);
    const contactDigits = c.replace(/\D/g, "");
    const phoneMatch = contactDigits.length === 7 && contactDigits === last7;

    if (!emailMatch && !phoneMatch) return NOT_FOUND;

    return NextResponse.json({
      found: true,
      ticket: {
        id: data.id,
        status: data.status,
        year: data.year,
        make: data.make,
        model: data.model,
        licensePlate: data.license_plate,
        issues: data.issues || [],
        assignedTo: data.assigned_to,
        appointmentDate: data.appointment_date,
        appointmentTime: data.appointment_time,
        customerName: data.customer_name,
      },
    });
  } catch (err) {
    console.error("POST /api/track", err);
    return NOT_FOUND;
  }
}
