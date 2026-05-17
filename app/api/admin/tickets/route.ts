import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createServerSupabase } from "@/lib/supabase-server";
import { Resend } from "resend";

function getServiceClient() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!);
}
function getResend() { return new Resend(process.env.RESEND_API_KEY!); }

export async function POST(req: NextRequest) {
  try {
    // Auth check
    const serverClient = await createServerSupabase();
    const { data: { user } } = await serverClient.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const {
      customerName, customerEmail, customerPhone,
      year, make, model, licensePlate, mileage,
      issues, notes, appointmentDate, appointmentTime,
      status = "received", assignedTo, sendEmail,
    } = body;

    if (!year || !make || !model || !issues?.length) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const ticketId = `CCAR-${Date.now()}`;
    const vehicleLabel = [year, make, model].join(" ");

    const serviceSupabase = getServiceClient();
    const { error } = await serviceSupabase.from("tickets").insert({
      id: ticketId,
      status,
      year, make, model,
      license_plate: licensePlate || null,
      mileage: mileage || null,
      issues,
      customer_name: customerName,
      customer_email: customerEmail?.toLowerCase() || null,
      customer_phone: customerPhone || null,
      notes: notes || null,
      appointment_date: appointmentDate || null,
      appointment_time: appointmentTime || null,
      assigned_to: assignedTo || null,
      source: "walkin",
    });
    if (error) throw error;

    // Optionally email the customer
    if (sendEmail && customerEmail) {
      const resend = getResend();
      await resend.emails.send({
        from: process.env.EMAIL_FROM!,
        to: customerEmail,
        subject: `Ticket ${ticketId} — ${vehicleLabel}`,
        html: `
          <h2>Hi ${customerName || "there"},</h2>
          <p>Your vehicle has been checked in. Ticket ID: <strong>${ticketId}</strong></p>
          <p><strong>Vehicle:</strong> ${vehicleLabel}</p>
          <p><strong>Issues:</strong> ${issues.join(", ")}</p>
          <p>We'll keep you updated on your repair. Call us at (530) 758-0204 with any questions.</p>
          <p>— Center City Auto Repair</p>
        `,
      }).catch(() => {});
    }

    return NextResponse.json({ success: true, ticketId });
  } catch (err) {
    console.error("POST /api/admin/tickets", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
