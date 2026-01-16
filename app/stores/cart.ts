import { defineStore } from 'pinia'

export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[]
  }),

  getters: {
    totalPrice: state =>
      state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      )
  },

  actions: {
    addItem(product: Omit<CartItem, 'quantity'>) {
      const existing = this.items.find(i => i.id === product.id)

      if (existing) {
        existing.quantity++
      } else {
        this.items.push({ ...product, quantity: 1 })
      }
    },

    removeItem(id: string) {
      this.items = this.items.filter(item => item.id !== id)
    },

    clear() {
      this.items = []
    }
  }
})
