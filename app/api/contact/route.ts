import {NextResponse} from 'next/server';
import {Resend} from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const deliveryError =
  'We could not submit your inquiry at this time. Please try again shortly.';

function field(form:FormData, ...names:string[]) {
  for (const name of names) {
    const value = form.get(name);
    if (typeof value === 'string' && value.trim()) return value.trim();
  }
  return '';
}

function escapeHtml(value:string) {
  return value.replace(/[&<>'"]/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;',
  })[character] as string);
}

function row(label:string, value:string) {
  if (!value) return '';
  return `<tr>
    <th style="padding:10px 16px 10px 0;text-align:left;vertical-align:top;color:#686962;font:600 12px Arial,sans-serif;text-transform:uppercase;letter-spacing:.08em">${escapeHtml(label)}</th>
    <td style="padding:10px 0;color:#171815;font:15px/1.6 Arial,sans-serif">${escapeHtml(value).replace(/\r?\n/g, '<br>')}</td>
  </tr>`;
}

export async function POST(request:Request) {
  try {
    const form = await request.formData();

    // Silently accept honeypot submissions without sending an email.
    if (field(form, 'website')) return NextResponse.json({ok: true});

    const name = field(form, 'name');
    const email = field(form, 'email');
    const phone = field(form, 'phone');
    const company = field(form, 'company', 'organization');
    const service = field(form, 'service', 'projectType', 'project', 'kind');
    const budget = field(form, 'budget');
    const message = field(form, 'message');
    const submittedAt = new Date().toISOString();

    if (name.length < 2) {
      return NextResponse.json(
        {ok: false, error: 'Please provide your name.'},
        {status: 400},
      );
    }
    if (!emailPattern.test(email) || email.length > 254) {
      return NextResponse.json(
        {ok: false, error: 'Please provide a valid email address.'},
        {status: 400},
      );
    }
    if (message.length < 10 || message.length > 10000) {
      return NextResponse.json(
        {ok: false, error: 'Please provide a message between 10 and 10,000 characters.'},
        {status: 400},
      );
    }
    if (!process.env.RESEND_API_KEY) {
      console.error('Contact form email failed: RESEND_API_KEY is not configured.');
      return NextResponse.json({ok: false, error: deliveryError}, {status: 500});
    }

    const {error} = await resend.emails.send({
      from: 'Structūra Website <contact@structuraintl.com>',
      to: ['sebastian@structuraintl.com'],
      replyTo: email,
      subject: `New Structūra website inquiry from ${name.replace(/[\r\n]/g, ' ')}`,
      html: `<!doctype html>
        <html><body style="margin:0;background:#f6f4ee;color:#171815">
          <div style="max-width:720px;margin:0 auto;padding:48px 32px">
            <p style="margin:0 0 12px;color:#9a7a3d;font:600 11px Arial,sans-serif;letter-spacing:.16em;text-transform:uppercase">Structūra website</p>
            <h1 style="margin:0 0 32px;font:400 32px Georgia,serif">New contact inquiry</h1>
            <table role="presentation" style="width:100%;border-collapse:collapse;border-top:1px solid #d8d4c9">
              ${row('Name', name)}
              ${row('Email', email)}
              ${row('Phone', phone)}
              ${row('Company', company)}
              ${row('Service / project type', service)}
              ${row('Budget', budget)}
              ${row('Message', message)}
              ${row('Submitted', submittedAt)}
            </table>
          </div>
        </body></html>`,
    });

    if (error) {
      console.error('Resend contact email failed:', error);
      return NextResponse.json({ok: false, error: deliveryError}, {status: 502});
    }

    return NextResponse.json({
      ok: true,
      message: 'Thank you. Your inquiry has been received. Our team will respond shortly.',
    });
  } catch (error) {
    console.error('Contact form submission failed:', error);
    return NextResponse.json({ok: false, error: deliveryError}, {status: 500});
  }
}
