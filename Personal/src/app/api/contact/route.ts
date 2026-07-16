import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    // Log the message transmission in developer terminal
    console.log("=========================================");
    console.log("TRANSMISSION RECEIVED:");
    console.log(`From: ${name} <${email}>`);
    console.log(`Message: ${message}`);
    console.log("=========================================");

    // Simulate database write or sending email via SMTP/Resend
    await new Promise((resolve) => setTimeout(resolve, 800));

    return NextResponse.json({ ok: true, status: "Transmission verified." });
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json({ ok: false, error: "Failed to parse payload." }, { status: 400 });
  }
}
