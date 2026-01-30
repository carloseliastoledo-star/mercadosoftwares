<template>
  <section class="bg-gray-100 min-h-screen py-12">
    <div class="max-w-7xl mx-auto px-6">
      <div class="bg-white rounded-2xl border border-gray-200 p-8">
        <h1 class="text-3xl font-extrabold text-gray-900">Quem Somos</h1>

        <div class="mt-6 space-y-4 text-gray-700 leading-relaxed">
      <p>
        {{ siteName }} é uma loja online focada na venda de produtos digitais e licenças de software, com entrega e suporte.
      </p>

      <div class="rounded-xl border bg-white p-5">
        <h2 class="text-xl font-bold text-gray-900">Dados da empresa</h2>
        <div class="mt-3 space-y-1 text-sm text-gray-700">
          <p><span class="font-semibold">Empresa:</span> Eletrokeys LTDA</p>
          <p><span class="font-semibold">CNPJ:</span> 44.694.365/0001-48</p>
        </div>
      </div>

      <div class="rounded-xl border bg-white p-5">
        <h2 class="text-xl font-bold text-gray-900">Contato e suporte</h2>
        <div class="mt-3 space-y-1 text-sm text-gray-700">
          <p>
            <span class="font-semibold">E-mail:</span>
            <a class="text-blue-600 hover:underline" :href="mailtoSupport">{{ supportEmail }}</a>
          </p>
          <p><span class="font-semibold">Atendimento:</span> em horário comercial.</p>
        </div>
      </div>

      <div class="rounded-xl border bg-white p-5">
        <h2 class="text-xl font-bold text-gray-900">Sobre os produtos</h2>
        <div class="mt-3 space-y-2 text-sm text-gray-700">
          <p>
            Os produtos disponibilizados neste site são digitais. A entrega pode ocorrer por e-mail e/ou disponibilização em área do cliente,
            conforme descrito na página de cada produto.
          </p>
          <p>
            Marcas e nomes de produtos mencionados pertencem aos seus respectivos proprietários.
          </p>
        </div>
      </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { siteName, supportEmail } = useSiteBranding()
const baseUrl = useSiteUrl()

const mailtoSupport = computed(() => {
  const email = String(supportEmail || '').trim()
  return email ? `mailto:${email}` : 'mailto:'
})

useSeoMeta({
  title: `Quem Somos | ${siteName}`
})

useHead(() => ({
  link: baseUrl ? [{ rel: 'canonical', href: `${baseUrl}/quem-somos` }] : []
}))
</script>
