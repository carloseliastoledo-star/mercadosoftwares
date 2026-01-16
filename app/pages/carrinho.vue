<script setup lang="ts">
import { useCartStore } from '~/stores/cart'

const cart = useCartStore()
</script>

<template>
  <main class="bg-gray-50 py-12 min-h-screen">
    <div class="max-w-6xl mx-auto px-4">
      <h1 class="text-2xl font-bold mb-8">
        Carrinho de compras
      </h1>

      <!-- CARRINHO VAZIO -->
      <div
        v-if="cart.items.length === 0"
        class="bg-white p-8 rounded-xl shadow text-center"
      >
        <p class="mb-4 text-gray-600">
          Seu carrinho está vazio.
        </p>
        <NuxtLink
          to="/"
          class="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
        >
          Voltar para a loja
        </NuxtLink>
      </div>

      <!-- CARRINHO COM PRODUTOS -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- LISTA -->
        <div class="lg:col-span-2 space-y-6">
          <div
            v-for="item in cart.items"
            :key="item.id"
            class="bg-white rounded-xl shadow p-6 flex gap-6"
          >
            <img
              :src="item.image"
              :alt="item.name"
              class="w-24 h-24 object-contain"
            />

            <div class="flex-1">
              <h2 class="font-semibold mb-2">
                {{ item.name }}
              </h2>
              <p class="text-gray-500">
                R$ {{ item.price.toFixed(2) }}
              </p>
            </div>

            <button
              @click="cart.removeItem(item.id)"
              class="text-red-500 hover:text-red-600 text-sm"
            >
              Remover
            </button>
          </div>
        </div>

        <!-- RESUMO -->
        <div class="bg-white rounded-xl shadow p-6 h-fit">
          <h2 class="font-semibold text-lg mb-4">
            Resumo do pedido
          </h2>

          <div class="flex justify-between mb-4 text-gray-700">
            <span>Total</span>
            <span class="font-bold">
              R$ {{ cart.totalPrice.toFixed(2) }}
            </span>
          </div>

          <NuxtLink
            to="/checkout"
            class="block text-center bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-lg font-semibold text-lg transition"
          >
            Finalizar compra
          </NuxtLink>
        </div>
      </div>
    </div>
  </main>
</template>
