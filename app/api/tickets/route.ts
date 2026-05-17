import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

function getDb() { return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!); }
function getResend() { return new Resend(process.env.RESEND_API_KEY!); }

const RATE_LIMIT_MS = 2 * 60 * 60 * 1000; // 2 hours

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { customerName, customerEmail, customerPhone, year, make, model, licensePlate, mileage, issues, notes, appointmentDate, appointmentTime } = body;

    if (!customerEmail || !year || !make || !model || !issues?.length) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Rate limit: 1 ticket per email per 2 hours
    const supabase = getDb();
    const resend = getResend();
    const cutoff = new Date(Date.now() - RATE_LIMIT_MS).toISOString();
    const { data: recent } = await supabase.from("tickets").select("id")
      .eq("customer_email", customerEmail.toLowerCase())
      .gte("created_at", cutoff).limit(1);
    if (recent && recent.length > 0) {
      return NextResponse.json({ error: "Too many requests. Please wait before submitting another ticket." }, { status: 429 });
    }

    const ticketId = `CCAR-${Date.now()}`;
    const { error } = await supabase.from("tickets").insert({
      id: ticketId,
      status: "received",
      year, make, model,
      license_plate: licensePlate || null,
      mileage: mileage || null,
      issues,
      customer_name: customerName,
      customer_email: customerEmail.toLowerCase(),
      customer_phone: customerPhone,
      notes: notes || null,
      appointment_date: appointmentDate || null,
      appointment_time: appointmentTime || null,
      source: "web",
    });
    if (error) throw error;

    const vehicleLabel = [year, make, model].join(" ");

    // Customer confirmation email
    await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: customerEmail,
      subject: `Ticket Confirmed — ${ticketId} | Center City Auto Repair`,
      html: `
        <h2>We got your request, ${customerName}!</h2>
        <p>Your ticket ID is <strong>${ticketId}</strong> — save this to track your repair status.</p>
        <p><strong>Vehicle:</strong> ${vehicleLabel}</p>
        <p><strong>Issues:</strong> ${issues.join(", ")}</p>
        ${appointmentDate ? `<p><strong>Appointment:</strong> ${appointmentDate}${appointmentTime ? ` at ${appointmentTime}` : ""}</p>` : ""}
        <p>We'll be in touch soon. Questions? Call us at (530) 758-0204.</p>
        <p>— Center City Auto Repair | 1180 Olive Drive, Davis CA 95616</p>
      `,
    }).catch(() => {}); // non-fatal

    // Owner notification
    await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: process.env.OWNER_EMAIL!,
      subject: `New Ticket ${ticketId} — ${vehicleLabel}`,
      html: `
        <p><strong>Ticket:</strong> ${ticketId}</p>
        <p><strong>Customer:</strong> ${customerName} — ${customerEmail} — ${customerPhone}</p>
        <p><strong>Vehicle:</strong> ${vehicleLabel}</p>
        <p><strong>Issues:</strong> ${issues.join(", ")}</p>
        ${notes ? `<p><strong>Notes:</strong> ${notes}</p>` : ""}
        ${appointmentDate ? `<p><strong>Appointment:</strong> ${appointmentDate}${appointmentTime ? ` at ${appointmentTime}` : ""}</p>` : ""}
      `,
    }).catch(() => {});

    return NextResponse.json({ success: true, ticketId });
  } catch (err) {
    console.error("POST /api/tickets", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
