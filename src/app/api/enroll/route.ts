import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, experienceLevel, motivation, timestamp } = body;

    // Validate required fields
    if (!name || !phone || !email || !experienceLevel) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    if (!webhookUrl) {
      console.error("GOOGLE_SHEETS_WEBHOOK_URL is not set");
      return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
    }

    const payload = {
      timestamp: timestamp || new Date().toISOString(),
      name,
      phone,
      email,
      experienceLevel,
      motivation: motivation || "",
    };

    const sheetsRes = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!sheetsRes.ok) {
      const text = await sheetsRes.text();
      console.error("Google Sheets webhook error:", text);
      return NextResponse.json({ error: "Failed to write to sheet" }, { status: 502 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Enroll API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
