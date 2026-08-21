import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const TO = 'contact@eurasiaprecept.org'
const FROM = 'Precept Eurasia <noreply@eurasiaprecept.org>'

// Limite de lungime: un mesaj legitim incape lejer, dar nu se poate trimite un roman.
const MAX = { name: 120, email: 200, subject: 200, message: 5000 }

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/**
 * Textul scris de vizitator ajunge intr-un email HTML. Fara escapare, oricine
 * putea injecta marcaj in mesajul care aterizeaza in casuta noastra: linkuri
 * false, formulare, stiluri care mascheaza continutul real. Scapam tot.
 */
function esc(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/** Sirurile din antetele email nu au voie sa contina CR/LF (injectare de anteturi). */
function header(value: string): string {
  return value.replace(/[\r\n]+/g, ' ').trim()
}

function field(value: unknown, max: number): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const name = field(body?.name, MAX.name)
    const email = field(body?.email, MAX.email)
    const subject = field(body?.subject, MAX.subject)
    const message = field(body?.message, MAX.message)

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: header(email),
      subject: header(subject ? `[Site] ${subject}` : `[Site] Mesaj nou de la ${name}`),
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #3D3C3C;">
          <div style="background: #183831; padding: 24px 32px; border-radius: 8px 8px 0 0;">
            <p style="color: #e5d350; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; margin: 0 0 4px;">Precept Eurasia</p>
            <h1 style="color: white; font-size: 20px; font-weight: 400; margin: 0;">Mesaj nou de pe site</h1>
          </div>
          <div style="background: #f7f6f4; padding: 32px; border: 1px solid #cccbc2; border-top: none; border-radius: 0 0 8px 8px;">
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
              <tr>
                <td style="padding: 8px 0; font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #6C6A6A; width: 80px;">Nume</td>
                <td style="padding: 8px 0; font-size: 15px; color: #3D3C3C;">${esc(name)}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #6C6A6A;">Email</td>
                <td style="padding: 8px 0; font-size: 15px;"><a href="mailto:${encodeURIComponent(email)}" style="color: #2e5a52;">${esc(email)}</a></td>
              </tr>
              ${subject ? `
              <tr>
                <td style="padding: 8px 0; font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #6C6A6A;">Subiect</td>
                <td style="padding: 8px 0; font-size: 15px; color: #3D3C3C;">${esc(subject)}</td>
              </tr>` : ''}
            </table>
            <div style="border-top: 1px solid #cccbc2; padding-top: 20px;">
              <p style="font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #6C6A6A; margin: 0 0 10px;">Mesaj</p>
              <p style="font-size: 15px; line-height: 1.7; color: #3D3C3C; white-space: pre-line; margin: 0;">${esc(message)}</p>
            </div>
          </div>
          <p style="font-size: 11px; color: #8A8886; text-align: center; margin-top: 20px;">
            Trimis de pe <a href="https://eurasiaprecept.org" style="color: #8A8886;">eurasiaprecept.org</a>
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
