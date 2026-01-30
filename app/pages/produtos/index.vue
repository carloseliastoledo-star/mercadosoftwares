<template>
  <section class="bg-gray-100 min-h-screen py-12">
    <div class="max-w-7xl mx-auto px-6">

      <div class="mb-10">
        <h1 class="text-3xl font-extrabold text-gray-900">
          Nossos Produtos
        </h1>
        <p class="text-gray-600 mt-2">
          Escolha a licença ideal e receba por e-mail após confirmação.
        </p>
      </div>

      <!-- Loading -->
      <div v-if="pending" class="text-center py-20 text-gray-500">
        Carregando produtos...
      </div>

      <!-- Erro -->
      <div v-else-if="error" class="text-center py-20 text-red-600">
        Erro ao carregar produtos.
      </div>

      <!-- Grid -->
      <div v-else class="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <ProductCard
          v-for="product in products"
          :key="product.id + product.imagem"
          :product="product"
        />
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import ProductCard from '~/components/ProductCard.vue'

definePageMeta({ ssr: true })

const baseUrl = useSiteUrl()

useHead(() => ({
  link: baseUrl ? [{ rel: 'canonical', href: `${baseUrl}/produtos` }] : []
}))

const { data, pending, error } = await useFetch('/api/products', {
  server: true
})

const products = computed(() => data.value || [])
</script>
