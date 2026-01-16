<script setup lang="ts">
import { useCartStore } from '~/stores/cart'
import { ref, onMounted } from 'vue'

const cart = useCartStore()
const ready = ref(false)
const loading = ref(false)

onMounted(() => {
  ready.value = true
})

async function pagarComStripe() {
  try {
    loading.value = true

    const response = await $fetch('/api/stripe/create-checkout', {
      method: 'POST',
      body: {
        items: cart.items
      }
    })

    if (!response?.url) {
      alert('Erro ao iniciar pagamento')
      return
    }

    window.location.href = response.url
  } catch (e) {
    alert('Erro no pagamento')
    console.error(e)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <main class="bg-gray-50 min-h-screen py-12">
    <div class="max-w-xl mx-auto bg-white p-8 rounded-xl shadow">
      <h1 class="text-2xl font-bold mb-6 text-center">
        Checkout
      </h1>

      <p v-if="!ready" class="text-center text-gray-500">
        Finalizando sua compra...
      </p>

      <div v-else>
        <div
          v-for="item in cart.items"
          :key="item.id"
          class="flex justify-between mb-3 text-gray-700"
        >
          <span>{{ item.name }} × {{ item.quantity }}</span>
          <span>R$ {{ (item.price * item.quantity).toFixed(2) }}</span>
        </div>

        <hr class="my-4" />

        <div class="flex justify-between font-bold text-lg mb-6">
          <span>Total</span>
          <span>R$ {{ cart.totalPrice.toFixed(2) }}</span>
        </div>

        <button
          @click="pagarComStripe"
          :disabled="loading"
          class="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white py-4 rounded-lg font-semibold text-lg transition"
        >
          {{ loading ? 'Processando...' : 'Pagar com Stripe' }}
        </button>
      </div>
    </div>
  </main>
</template>
