'use server'

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactMessage(data: {
  name: string;
  email: string;
  message: string;
}) {
  try {
    const { error } = await resend.emails.send({
      from: 'PixelForge Contact <contact@pixelforge.digital>',
      to: ['subho@pixelforge.digital'],
      replyTo: data.email,
      subject: `New message from ${data.name} — PixelForge`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #07000f; color: #f0eaff; padding: 40px; border-radius: 16px;">
          <div style="border-bottom: 1px solid rgba(168,85,247,0.2); padding-bottom: 24px; margin-bottom: 32px;">
            <h1 style="font-size: 28px; color: #a855f7; margin: 0 0 4px 0; font-style: italic;">New Message</h1>
            <p style="color: rgba(240,234,255,0.4); font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; margin: 0;">via PixelForge Contact Form</p>
          </div>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 32px;">
            <tr>
              <td style="color: rgba(240,234,255,0.4); font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; padding: 0 0 4px 0; width: 80px;">From</td>
              <td style="color: #f0eaff; font-size: 16px; font-weight: 600;">${data.name}</td>
            </tr>
            <tr><td colspan="2" style="height: 16px;"></td></tr>
            <tr>
              <td style="color: rgba(240,234,255,0.4); font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; padding: 0 0 4px 0;">Email</td>
              <td><a href="mailto:${data.email}" style="color: #a855f7; font-size: 15px;">${data.email}</a></td>
            </tr>
          </table>

          <div style="background: rgba(168,85,247,0.05); border: 1px solid rgba(168,85,247,0.15); border-radius: 12px; padding: 24px;">
            <p style="color: rgba(240,234,255,0.4); font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; margin: 0 0 12px 0;">Message</p>
            <p style="color: #f0eaff; font-size: 16px; line-height: 1.7; margin: 0; white-space: pre-wrap;">${data.message}</p>
          </div>

          <p style="color: rgba(240,234,255,0.2); font-size: 11px; text-align: center; margin-top: 40px; letter-spacing: 0.1em;">
            Hit reply to respond directly to ${data.name}.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    console.error('Contact action error:', err);
    return { success: false, error: err instanceof Error ? err.message : 'Unknown error' };
  }
}
