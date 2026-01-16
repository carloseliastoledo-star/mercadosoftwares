<script setup>
import produtos from '../../data/produtos'
</script>

<template>
  <section class="bg-gray-50 py-20">
    <div class="max-w-6xl mx-auto px-6">
      <h2 class="text-3xl font-bold text-center mb-12">
        Produtos Mais Vendidos
      </h2>

      <div class="grid gap-8 md:grid-cols-3">
        <ProductCard
          v-for="p in produtos"
          :key="p.slug"
          :product="p"
        />
      </div>
    </div>
  </section>
</template>
