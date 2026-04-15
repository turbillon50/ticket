import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export interface Review {
  id: string
  eventId: string
  userId: string
  userName: string
  rating: number
  title: string
  comment: string
  verified: boolean
  helpful: number
  createdAt: string
}

// In production, this would connect to a database
const mockReviews: Review[] = [
  {
    id: 'rev_1',
    eventId: 'evt_electric',
    userId: 'user_1',
    userName: 'Emma Wilson',
    rating: 5,
    title: 'Absolutely Amazing Experience!',
    comment: 'The Electric Summer Festival was incredible! The organization, entertainment, and accommodation were all top-notch. URMAH made booking everything so easy. Can\'t wait for the next one!',
    verified: true,
    helpful: 234,
    createdAt: '2026-02-15',
  },
  {
    id: 'rev_2',
    eventId: 'evt_electric',
    userId: 'user_2',
    userName: 'James Chen',
    rating: 5,
    title: 'Best Festival Bundle Ever',
    comment: 'Having flights and accommodation bundled with the festival ticket was genius. No hassle, everything coordinated perfectly. The neon green aesthetic was fire too!',
    verified: true,
    helpful: 156,
    createdAt: '2026-02-14',
  },
  {
    id: 'rev_3',
    eventId: 'evt_electric',
    userId: 'user_3',
    userName: 'Sofia Martinez',
    rating: 4,
    title: 'Great Event, Minor Issues',
    comment: 'Overall fantastic experience. The only minor issue was the check-in process took longer than expected. But the venue, entertainment, and vibe were perfect!',
    verified: true,
    helpful: 98,
    createdAt: '2026-02-12',
  },
  {
    id: 'rev_4',
    eventId: 'evt_electric',
    userId: 'user_4',
    userName: 'Michael Roberts',
    rating: 5,
    title: 'Worth Every Penny',
    comment: 'The all-inclusive model is the way to go for festivals. Booking, flying, and staying all through one platform was seamless. URMAH is changing the game!',
    verified: true,
    helpful: 412,
    createdAt: '2026-02-10',
  },
]

export async function getEventReviews(eventId: string): Promise<Review[]> {
  // In production, query database
  return mockReviews.filter((r) => r.eventId === eventId).sort((a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
}

export async function createReview(
  eventId: string,
  userId: string,
  userName: string,
  data: {
    rating: number
    title: string
    comment: string
  }
): Promise<Review> {
  const review: Review = {
    id: `rev_${Date.now()}`,
    eventId,
    userId,
    userName,
    rating: data.rating,
    title: data.title,
    comment: data.comment,
    verified: true,
    helpful: 0,
    createdAt: new Date().toISOString().split('T')[0],
  }

  // In production, save to database
  mockReviews.push(review)
  console.log('Review created:', review)

  // Send confirmation email to reviewer
  try {
    await resend.emails.send({
      from: 'URMAH <noreply@urmah.events>',
      to: userId,
      subject: '✨ Your Review Has Been Posted',
      html: `
        <div style="font-family: Arial, sans-serif; background: #000000; color: #ffffff; padding: 40px; border-radius: 10px;">
          <h1 style="color: #00ff88;">Thank You for Your Review!</h1>
          <p>Your review has been posted and is now visible to other travelers planning their next adventure.</p>
          <div style="background: #0f0f0f; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Rating:</strong> ${'★'.repeat(data.rating)}${'☆'.repeat(5 - data.rating)}</p>
            <p><strong>Your Review:</strong> ${data.comment}</p>
          </div>
          <p style="color: #a8c5dd;">Help other travelers by sharing your experience on URMAH!</p>
        </div>
      `,
    })
  } catch (error) {
    console.error('Failed to send review confirmation email:', error)
  }

  return review
}

export function getAverageRating(reviews: Review[]): number {
  if (reviews.length === 0) return 0
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0)
  return Math.round((sum / reviews.length) * 10) / 10
}

export function getRatingDistribution(reviews: Review[]): Record<number, number> {
  const distribution: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
  reviews.forEach((review) => {
    distribution[review.rating as keyof typeof distribution]++
  })
  return distribution
}

export function getVerifiedReviews(reviews: Review[]): Review[] {
  return reviews.filter((r) => r.verified)
}

export async function markReviewHelpful(reviewId: string): Promise<void> {
  const review = mockReviews.find((r) => r.id === reviewId)
  if (review) {
    review.helpful++
  }
}
