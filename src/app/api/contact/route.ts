import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const TO = 'contact@eurasiaprecept.org'
const FROM = 'Precept Eurasia <onboarding@resend.dev>'

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject: subject ? `[Site] ${subject}` : `[Site] Mesaj nou de la ${name}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
          <div style="background: #1a3a2a; padding: 24px 32px; border-radius: 8px 8px 0 0;">
            <p style="color: #c9a84c; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; margin: 0 0 4px;">Precept Eurasia</p>
            <h1 style="color: white; font-size: 20px; font-weight: 400; margin: 0;">Mesaj nou de pe site</h1>
          </div>
          <div style="background: #f9f7f2; padding: 32px; border: 1px solid #e0dbd0; border-top: none; border-radius: 0 0 8px 8px;">
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
              <tr>
                <td style="padding: 8px 0; font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #888; width: 80px;">Nume</td>
                <td style="padding: 8px 0; font-size: 15px; color: #1a1a1a;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #888;">Email</td>
                <td style="padding: 8px 0; font-size: 15px;"><a href="mailto:${email}" style="color: #3d7a72;">${email}</a></td>
              </tr>
              ${subject ? `
              <tr>
                <td style="padding: 8px 0; font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #888;">Subiect</td>
                <td style="padding: 8px 0; font-size: 15px; color: #1a1a1a;">${subject}</td>
              </tr>` : ''}
            </table>
            <div style="border-top: 1px solid #e0dbd0; padding-top: 20px;">
              <p style="font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #888; margin: 0 0 10px;">Mesaj</p>
              <p style="font-size: 15px; line-height: 1.7; color: #333; white-space: pre-line; margin: 0;">${message}</p>
            </div>
          </div>
          <p style="font-size: 11px; color: #aaa; text-align: center; margin-top: 20px;">
            Trimis de pe <a href="https://eurasiaprecept.org" style="color: #aaa;">eurasiaprecept.org</a>
          </p>
        </div>
      `,
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
