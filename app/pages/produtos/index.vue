<script setup>
useSeoMeta({
  title: 'Produtos | Casa do Software',
})

import produtos from '../../data/produtos'
</script>

<template>
  <section class="py-10">
    <h1 class="text-3xl font-bold mb-8">
      Produtos
    </h1>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <ProductCard
        v-for="p in produtos"
        :key="p.slug"
        :product="p"
      />
    </div>
  </section>
</template>
