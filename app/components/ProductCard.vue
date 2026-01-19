<template>
  <NuxtLink
    :to="`/produto/${product.slug}`"
    class="group block bg-white rounded-2xl shadow hover:shadow-xl transition p-5 relative overflow-hidden border border-gray-100"
  >
    <!-- Badge topo -->
    <div
      class="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow"
    >
      ENVIO IMEDIATO
    </div>

    <!-- Imagem -->
    <div class="flex items-center justify-center h-36 mb-4">
      <img
        :src="imageSrc"
        :alt="product.nome"
        class="max-h-32 object-contain group-hover:scale-105 transition"
      />
    </div>

    <!-- Nome -->
    <h3 class="text-base font-bold text-gray-900 leading-tight mb-1 line-clamp-2">
      {{ product.nome }}
    </h3>

    <!-- Mini descrição -->
    <p class="text-sm text-gray-600 mb-3 line-clamp-2">
      {{ safeDescription }}
    </p>

    <!-- Prova social fake controlada -->
    <div class="text-xs text-gray-500 mb-3 flex items-center gap-1">
      ⭐⭐⭐⭐⭐ <span class="ml-1">Mais de 2.000 ativações</span>
    </div>

    <!-- Preço -->
    <div class="flex items-end gap-2 mb-4">
      <span class="text-gray-400 line-through text-sm">
        R$ {{ fakeOldPrice }}
      </span>

      <span class="text-2xl font-extrabold text-blue-600">
        R$ {{ product.preco.toFixed(2) }}
      </span>
    </div>

    <!-- Botão -->
    <span
      class="block text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition group-hover:scale-[1.02]"
    >
      Comprar agora
    </span>

    <!-- Selo de garantia -->
    <div class="text-xs text-gray-500 mt-3 text-center">
      ✔ Licença original • Garantia vitalícia
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  product: {
    id: string
    nome: string
    slug: string
    descricao?: string | null
    preco: number
    imagem?: string | null
  }
}>()

const imageSrc = computed(() => {
  const img = props.product.imagem

  if (!img) return '/images/product-placeholder.png'
  if (img.startsWith('/')) return img
  return `/images/produto/${img}`
})

// Blindagem de descrição (SSR-safe)
const safeDescription = computed(() => {
  return (
    props.product.descricao ||
    'Licença original para ativação imediata com garantia vitalícia.'
  )
})

// Preço âncora (efeito desconto psicológico)
const fakeOldPrice = computed(() => {
  const price = props.product.preco
  const anchor = price * 1.4
  return anchor.toFixed(2)
})
</script>
