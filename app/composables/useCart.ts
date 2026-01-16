import { ref, watch } from 'vue'

const cart = ref<any[]>([])

// carregar do localStorage (client only)
if (import.meta.client) {
  const saved = localStorage.getItem('cart')
  if (saved) {
    cart.value = JSON.parse(saved)
  }
}

// persistir automaticamente
watch(
  cart,
  (val) => {
    if (import.meta.client) {
      localStorage.setItem('cart', JSON.stringify(val))
    }
  },
  { deep: true }
)

export function useCart () {
  function addToCart (product: any) {
    if (!product) return

    const existing = cart.value.find(
      (p) => p.slug === product.slug
    )

    if (existing) {
      existing.quantidade++
    } else {
      cart.value.push({
        ...product,
        quantidade: 1
      })
    }
  }

  function clearCart () {
    cart.value = []
    if (import.meta.client) {
      localStorage.removeItem('cart')
    }
  }

  return {
    cart,
    addToCart,
    clearCart
  }
}
