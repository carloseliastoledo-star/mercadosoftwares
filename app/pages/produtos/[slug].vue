<script setup>
import { useRoute } from 'vue-router'
import produtos from '../../data/produtos'

const route = useRoute()

const produto = produtos.find(
  (p) => p.slug === route.params.slug
)

if (!produto) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Produto não encontrado',
  })
}

useSeoMeta({
  title: `${produto.name} | Casa do Software`,
  description:
    'Licença digital original com entrega imediata por e-mail.',
})
</script>

<template>
  <section class="py-10 max-w-3xl">
    <h1 class="text-3xl font-bold mb-4">
      {{ produto.name }}
    </h1>

    <p class="text-xl text-blue-600 font-semibold mb-6">
      R$ {{ produto.price.toFixed(2).replace('.', ',') }}
    </p>

    <p class="mb-8 text-gray-700">
      Produto digital com entrega imediata por e-mail.
      Licença original com ativação garantida.
    </p>

    <button
      class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold"
    >
      Comprar agora
    </button>
  </section>
</template>
