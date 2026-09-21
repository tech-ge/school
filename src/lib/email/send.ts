interface SendEmailInput {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

export async function sendEmail({ to, subject, html, from }: SendEmailInput) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.log('[EMAIL:DEV]', { to, subject });
    return { ok: true, dev: true };
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: from || 'TechGeo University <noreply@techgeo.edu>',
      to,
      subject,
      html,
    }),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Email failed: ${error}`);
  }

  return res.json();
}

export function paymentReceiptEmail(name: string, amount: number, reference: string) {
  return `
    <div style="font-family:Inter,sans-serif;background:#05060a;color:#e6e8f0;padding:40px;border-radius:16px;">
      <h1 style="color:#d4af37;font-family:serif;margin:0 0 16px;">TechGeo University</h1>
      <p>Dear ${name},</p>
      <p>Your payment of <strong style="color:#d4af37;">₦${(amount / 100).toLocaleString()}</strong> has been received.</p>
      <p>Reference: <code style="background:#0f121c;padding:4px 8px;border-radius:6px;">${reference}</code></p>
      <p style="color:#8b92a8;font-size:12px;margin-top:24px;">Thank you for choosing TechGeo.</p>
    </div>
  `;
}
