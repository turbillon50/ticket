import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendBookingConfirmation(
  email: string,
  booking: {
    orderId: string
    eventName: string
    total: number
    items: Array<{ title: string; price: number }>
  }
) {
  try {
    await resend.emails.send({
      from: 'URMAH <noreply@urmah.events>',
      to: email,
      subject: `🎉 Booking Confirmed - Order #${booking.orderId}`,
      html: `
        <div style="font-family: Arial, sans-serif; background: #000000; color: #ffffff; padding: 40px; border-radius: 10px;">
          <h1 style="color: #00ff88; text-align: center; margin-bottom: 30px;">✨ Booking Confirmed!</h1>

          <div style="background: #0f0f0f; padding: 20px; border-radius: 8px; border-left: 4px solid #00ff88; margin-bottom: 20px;">
            <p><strong>Order ID:</strong> ${booking.orderId}</p>
            <p><strong>Event:</strong> ${booking.eventName}</p>
          </div>

          <h3 style="color: #00ff88; margin-top: 20px;">Your Bundle:</h3>
          <ul style="background: #0f0f0f; padding: 20px; border-radius: 8px;">
            ${booking.items.map((item) => `<li style="margin-bottom: 10px;">${item.title} - <strong>$${item.price}</strong></li>`).join('')}
          </ul>

          <div style="background: #00ff88; color: #000000; padding: 20px; border-radius: 8px; text-align: center; margin-top: 20px;">
            <h2>Total: $${booking.total}</h2>
          </div>

          <p style="color: #a8c5dd; margin-top: 30px; text-align: center;">
            Download your tickets and get ready for an unforgettable experience!
          </p>

          <div style="text-align: center; margin-top: 40px;">
            <a href="https://urmah.events/my-bookings" style="background: #00ff88; color: #000000; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold;">
              View Your Booking
            </a>
          </div>
        </div>
      `,
    })
  } catch (error) {
    console.error('Failed to send email:', error)
    throw error
  }
}

export async function sendCampaignEmail(
  email: string,
  campaign: {
    subject: string
    title: string
    content: string
    ctaText: string
    ctaUrl: string
  }
) {
  try {
    await resend.emails.send({
      from: 'URMAH <campaigns@urmah.events>',
      to: email,
      subject: campaign.subject,
      html: `
        <div style="font-family: Arial, sans-serif; background: #000000; color: #ffffff; padding: 40px; border-radius: 10px;">
          <h1 style="color: #00ff88; text-align: center; margin-bottom: 20px;">${campaign.title}</h1>

          <p style="color: #a8c5dd; line-height: 1.6; margin-bottom: 30px;">
            ${campaign.content}
          </p>

          <div style="text-align: center;">
            <a href="${campaign.ctaUrl}" style="background: #00ff88; color: #000000; padding: 14px 40px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
              ${campaign.ctaText}
            </a>
          </div>

          <p style="color: #6b7280; margin-top: 40px; text-align: center; font-size: 12px;">
            © 2026 URMAH. All rights reserved.
          </p>
        </div>
      `,
    })
  } catch (error) {
    console.error('Failed to send campaign email:', error)
    throw error
  }
}
