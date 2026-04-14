export type Language = 'en' | 'es' | 'ko'

export interface Event {
  id: string
  name: string
  location: string
  date: string
  category: string
  price: number
  image: string
  description: string
  tickets: number
}

export interface Flight {
  id: string
  departure: string
  arrival: string
  duration: number
  price: number
  airline: string
  stops: number
}

export interface Accommodation {
  id: string
  name: string
  location: string
  price: number
  rating: number
  image: string
  beds: number
}

export interface CartItem {
  id: string
  type: 'event' | 'flight' | 'accommodation'
  name: string
  price: number
  quantity: number
}
