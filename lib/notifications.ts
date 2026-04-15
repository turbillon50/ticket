import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export type NotificationType = 'booking' | 'reminder' | 'promotion' | 'message' | 'update' | 'warning'

export interface Notification {
  id: string
  userId: string
  type: NotificationType
  title: string
  message: string
  data?: Record<string, any>
  read: boolean
  createdAt: string
}

export interface NotificationPreferences {
  emailNotifications: boolean
  pushNotifications: boolean
  inAppNotifications: boolean
  bookingAlerts: boolean
  eventReminders: boolean
  promotions: boolean
  messages: boolean
}

// Mock in-app notifications storage
const inAppNotifications: Notification[] = []

export async function sendEmailNotification(
  email: string,
  notification: {
    subject: string
    title: string
    message: string
    actionUrl?: string
    actionText?: string
  }
): Promise<void> {
  try {
    await resend.emails.send({
      from: 'URMAH <notifications@urmah.events>',
      to: email,
      subject: notification.subject,
      html: `
        <div style="font-family: Arial, sans-serif; background: #000000; color: #ffffff; padding: 40px; border-radius: 10px;">
          <h1 style="color: #00ff88; margin-bottom: 20px;">${notification.title}</h1>

          <p style="color: #a8c5dd; line-height: 1.6; margin-bottom: 30px;">
            ${notification.message}
          </p>

          ${
            notification.actionUrl
              ? `
            <div style="text-align: center; margin: 30px 0;">
              <a href="${notification.actionUrl}" style="background: #00ff88; color: #000000; padding: 14px 40px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                ${notification.actionText || 'View Details'}
              </a>
            </div>
          `
              : ''
          }

          <p style="color: #6b7280; margin-top: 40px; text-align: center; font-size: 12px;">
            © 2026 URMAH. All rights reserved.<br/>
            <a href="https://urmah.events/notifications/preferences" style="color: #00ff88; text-decoration: none;">Manage Notification Preferences</a>
          </p>
        </div>
      `,
    })
    console.log(`Email notification sent to ${email}`)
  } catch (error) {
    console.error('Failed to send email notification:', error)
    throw error
  }
}

export async function createInAppNotification(
  userId: string,
  notification: {
    type: NotificationType
    title: string
    message: string
    data?: Record<string, any>
  }
): Promise<Notification> {
  const inAppNotif: Notification = {
    id: `notif_${Date.now()}`,
    userId,
    type: notification.type,
    title: notification.title,
    message: notification.message,
    data: notification.data,
    read: false,
    createdAt: new Date().toISOString(),
  }

  // In production, save to database
  inAppNotifications.push(inAppNotif)
  console.log('In-app notification created:', inAppNotif)

  return inAppNotif
}

export async function sendPushNotification(
  userId: string,
  notification: {
    title: string
    message: string
    icon?: string
    action?: string
  }
): Promise<void> {
  // In production, use service worker and Web Push API
  console.log(`Push notification queued for user ${userId}:`, notification)

  // For now, also create an in-app notification
  await createInAppNotification(userId, {
    type: 'update',
    title: notification.title,
    message: notification.message,
  })
}

export async function getNotifications(userId: string, limit: number = 10): Promise<Notification[]> {
  // In production, query database
  return inAppNotifications
    .filter((n) => n.userId === userId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit)
}

export async function markNotificationAsRead(notificationId: string): Promise<void> {
  const notification = inAppNotifications.find((n) => n.id === notificationId)
  if (notification) {
    notification.read = true
  }
}

export async function markAllNotificationsAsRead(userId: string): Promise<void> {
  inAppNotifications.forEach((n) => {
    if (n.userId === userId) {
      n.read = true
    }
  })
}

export async function sendBookingConfirmationNotification(
  email: string,
  userId: string,
  bookingData: {
    orderId: string
    eventName: string
    eventDate: string
    total: number
  }
): Promise<void> {
  // Send email
  await sendEmailNotification(email, {
    subject: `🎉 Booking Confirmed - Order #${bookingData.orderId}`,
    title: '✨ Your Booking is Confirmed!',
    message: `Your tickets for <strong>${bookingData.eventName}</strong> (${bookingData.eventDate}) are ready! Order total: <strong>$${bookingData.total.toFixed(2)}</strong>`,
    actionUrl: `https://urmah.events/booking-success?orderId=${bookingData.orderId}`,
    actionText: 'View Your Booking',
  })

  // Create in-app notification
  await createInAppNotification(userId, {
    type: 'booking',
    title: 'Booking Confirmed',
    message: `Your booking for ${bookingData.eventName} is confirmed!`,
    data: {
      orderId: bookingData.orderId,
      eventName: bookingData.eventName,
    },
  })

  // Send push notification
  await sendPushNotification(userId, {
    title: 'Booking Confirmed!',
    message: `Your ${bookingData.eventName} booking is ready.`,
  })
}

export async function sendEventReminderNotification(
  email: string,
  userId: string,
  eventData: {
    eventName: string
    eventDate: string
    daysUntil: number
  }
): Promise<void> {
  const message =
    eventData.daysUntil === 1
      ? `Your event starts tomorrow!`
      : `${eventData.daysUntil} days until ${eventData.eventName}!`

  // Send email
  await sendEmailNotification(email, {
    subject: `📅 Event Reminder: ${eventData.eventName}`,
    title: '🎯 Event Reminder',
    message,
    actionUrl: `https://urmah.events/my-bookings`,
    actionText: 'View Your Bookings',
  })

  // Create in-app notification
  await createInAppNotification(userId, {
    type: 'reminder',
    title: 'Event Reminder',
    message,
    data: {
      eventName: eventData.eventName,
      daysUntil: eventData.daysUntil,
    },
  })

  // Send push notification
  await sendPushNotification(userId, {
    title: 'Event Starting Soon',
    message: `${message}`,
  })
}

export async function sendPromotionalNotification(
  email: string,
  userId: string,
  promotionData: {
    title: string
    message: string
    discount?: string
    promoCode?: string
  }
): Promise<void> {
  // Send email
  await sendEmailNotification(email, {
    subject: `🎉 ${promotionData.title}`,
    title: promotionData.title,
    message: promotionData.message + (promotionData.promoCode ? ` Use code <strong>${promotionData.promoCode}</strong>` : ''),
    actionUrl: `https://urmah.events/all-inclusive`,
    actionText: 'View Events',
  })

  // Create in-app notification
  await createInAppNotification(userId, {
    type: 'promotion',
    title: promotionData.title,
    message: promotionData.message,
    data: {
      promoCode: promotionData.promoCode,
      discount: promotionData.discount,
    },
  })

  // Send push notification
  await sendPushNotification(userId, {
    title: promotionData.title,
    message: promotionData.message,
  })
}

export async function sendMessageNotification(
  email: string,
  userId: string,
  messageData: {
    senderName: string
    senderAvatar: string
    messagePreview: string
  }
): Promise<void> {
  // Send email
  await sendEmailNotification(email, {
    subject: `💬 New message from ${messageData.senderName}`,
    title: 'New Message',
    message: `${messageData.senderName} sent you a message: "${messageData.messagePreview}"`,
    actionUrl: `https://urmah.events/messages`,
    actionText: 'View Message',
  })

  // Create in-app notification
  await createInAppNotification(userId, {
    type: 'message',
    title: `Message from ${messageData.senderName}`,
    message: messageData.messagePreview,
    data: {
      senderName: messageData.senderName,
    },
  })

  // Send push notification
  await sendPushNotification(userId, {
    title: `Message from ${messageData.senderName}`,
    message: messageData.messagePreview,
  })
}

export function getNotificationIcon(type: NotificationType): string {
  const icons: Record<NotificationType, string> = {
    booking: '🎫',
    reminder: '🔔',
    promotion: '🎉',
    message: '💬',
    update: '📢',
    warning: '⚠️',
  }
  return icons[type]
}

export function getNotificationColor(type: NotificationType): string {
  const colors: Record<NotificationType, string> = {
    booking: 'text-neon-green',
    reminder: 'text-yellow-400',
    promotion: 'text-pink-400',
    message: 'text-blue-400',
    update: 'text-purple-400',
    warning: 'text-red-400',
  }
  return colors[type]
}
