import { create } from 'zustand'

export interface CartItem {
  id: string
  type: 'event' | 'flight' | 'accommodation'
  title: string
  price: number
  quantity: number
  details: any
}

export interface Cart {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
  getItemCount: () => number
}

export const useCart = create<Cart>((set, get) => ({
  items: [],

  addItem: (item: CartItem) => {
    set((state) => {
      const existing = state.items.find((i) => i.id === item.id)
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
          ),
        }
      }
      return { items: [...state.items, item] }
    })
  },

  removeItem: (id: string) => {
    set((state) => ({
      items: state.items.filter((i) => i.id !== id),
    }))
  },

  updateQuantity: (id: string, quantity: number) => {
    set((state) => ({
      items: state.items.map((i) =>
        i.id === id ? { ...i, quantity: Math.max(0, quantity) } : i
      ),
    }))
  },

  clearCart: () => set({ items: [] }),

  getTotal: () => {
    const items = get().items
    return items.reduce((total, item) => total + item.price * item.quantity, 0)
  },

  getItemCount: () => {
    const items = get().items
    return items.reduce((count, item) => count + item.quantity, 0)
  },
}))
