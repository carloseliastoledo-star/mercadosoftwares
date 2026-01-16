cancelado.vue<template>
  <main class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-3xl font-bold text-red-600 mb-4">
        Pagamento cancelado
      </h1>
      <p class="mb-6">
        Você pode tentar novamente quando quiser.
      </p>
      <NuxtLink
        to="/carrinho"
        class="bg-orange-500 text-white px-6 py-3 rounded-lg"
      >
        Voltar ao carrinho
      </NuxtLink>
    </div>
  </main>
</template>
