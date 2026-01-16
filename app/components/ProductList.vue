<template>
  <div class="grid md:grid-cols-3 gap-8">
    <ProductCard
      v-for="product in products"
      :key="product.slug"
      :product="product"
    />
  </div>
</template>

<script setup lang="ts">
import ProductCard from '~/components/ProductCard.vue'

defineProps<{
  products: any[]
}>()
</script>
