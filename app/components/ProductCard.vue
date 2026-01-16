<script setup>
defineProps({
  product: Object,
})
</script>

<template>
  <div class="bg-white rounded-xl shadow p-6 text-center">
    <h3 class="font-semibold text-lg mb-2">
      {{ product.name }}
    </h3>

    <p class="text-blue-600 font-bold text-2xl mb-4">
      R$ {{ product.price.toFixed(2).replace('.', ',') }}
    </p>

    <NuxtLink
      :to="`/produto/${product.slug}`"
      class="block bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
    >
      Comprar Agora
    </NuxtLink>

    <p class="mt-3 text-xs text-gray-500">
      Licença digital • Entrega imediata
    </p>
  </div>
</template>
