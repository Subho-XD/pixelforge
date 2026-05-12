import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    // Lazy-import nodemailer so it doesn't bloat the client bundle
    const nodemailer = await import("nodemailer");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <style>
          body { font-family: 'Georgia', serif; background: #090111; color: #fff; margin: 0; padding: 0; }
          .wrap { max-width: 560px; margin: 0 auto; padding: 40px 32px; }
          .label { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(255,255,255,0.4); margin-bottom: 4px; }
          .value { font-size: 16px; color: #fff; margin-bottom: 24px; }
          .msg { font-size: 16px; line-height: 1.8; color: rgba(255,255,255,0.75); border-left: 2px solid #8A2BE2; padding-left: 16px; }
          .footer { margin-top: 40px; font-size: 11px; color: rgba(255,255,255,0.25); letter-spacing: 0.1em; }
        </style>
      </head>
      <body>
        <div class="wrap">
          <p class="label">New message via PixelForge Contact</p>
          <p class="label">From</p>
          <p class="value">${name} &lt;${email}&gt;</p>
          <p class="label">Message</p>
          <p class="msg">${message.replace(/\n/g, "<br/>")}</p>
          <p class="footer">pixelforge.digital · subho@pixelforge.digital</p>
        </div>
      </body>
      </html>
    `;

    await transporter.sendMail({
      from: `"PixelForge Contact" <${process.env.GMAIL_USER}>`,
      to: "subho@pixelforge.digital",
      replyTo: email,
      subject: `New message from ${name}`,
      html,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Failed to send message. Please try again." }, { status: 500 });
  }
}
