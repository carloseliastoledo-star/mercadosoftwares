<template>
  <section class="bg-gray-100 min-h-screen py-12">
    <div class="max-w-7xl mx-auto px-6">
      <div class="bg-white rounded-2xl border border-gray-200 p-8">
        <h1 class="text-3xl font-extrabold text-gray-900">Termos de Uso</h1>

        <div class="mt-6 space-y-4 text-gray-700 leading-relaxed">
      <p>
        Ao acessar e utilizar este site, você concorda com os termos e condições descritos abaixo.
      </p>

      <div class="rounded-xl border bg-white p-5 space-y-3">
        <h2 class="text-xl font-bold text-gray-900">1. Produtos digitais</h2>
        <p class="text-sm">
          Os produtos comercializados são digitais. As condições de entrega, instruções e requisitos constam na página do produto.
        </p>
      </div>

      <div class="rounded-xl border bg-white p-5 space-y-3">
        <h2 class="text-xl font-bold text-gray-900">2. Uso correto</h2>
        <p class="text-sm">
          Você se compromete a fornecer informações verdadeiras no momento da compra e a utilizar o site de forma lícita.
        </p>
      </div>

      <div class="rounded-xl border bg-white p-5 space-y-3">
        <h2 class="text-xl font-bold text-gray-900">3. Suporte</h2>
        <p class="text-sm">
          Oferecemos suporte para dúvidas relacionadas à entrega e utilização do produto, conforme o canal informado.
        </p>
      </div>

      <div class="rounded-xl border bg-white p-5 space-y-3">
        <h2 class="text-xl font-bold text-gray-900">4. Propriedade intelectual</h2>
        <p class="text-sm">
          Marcas, nomes comerciais e logotipos citados pertencem aos seus respectivos proprietários.
        </p>
      </div>

      <div class="rounded-xl border bg-white p-5 space-y-3">
        <h2 class="text-xl font-bold text-gray-900">5. Empresa</h2>
        <p class="text-sm">
          Eletrokeys LTDA — CNPJ 44.694.365/0001-48.
        </p>
      </div>

      <p class="text-sm text-gray-600">
        Estes termos podem ser atualizados periodicamente.
      </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { siteName } = useSiteBranding()
const baseUrl = useSiteUrl()

useSeoMeta({
  title: `Termos de Uso | ${siteName}`
})

useHead(() => ({
  link: baseUrl ? [{ rel: 'canonical', href: `${baseUrl}/termos` }] : []
}))
</script>
