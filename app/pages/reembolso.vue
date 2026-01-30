<template>
  <section class="bg-gray-100 min-h-screen py-12">
    <div class="max-w-7xl mx-auto px-6">
      <div class="bg-white rounded-2xl border border-gray-200 p-8">
        <h1 class="text-3xl font-extrabold text-gray-900">Política de Reembolso</h1>

        <div class="mt-6 space-y-4 text-gray-700 leading-relaxed">
      <p>
        Esta política descreve as condições de reembolso para produtos digitais adquiridos neste site.
      </p>

      <div class="rounded-xl border bg-white p-5 space-y-3">
        <h2 class="text-xl font-bold text-gray-900">1. Produto digital</h2>
        <p class="text-sm">
          Por se tratar de produto digital, o reembolso pode depender do status de entrega e do uso do conteúdo digital.
        </p>
      </div>

      <div class="rounded-xl border bg-white p-5 space-y-3">
        <h2 class="text-xl font-bold text-gray-900">2. Quando avaliamos reembolso</h2>
        <ul class="text-sm list-disc pl-5 space-y-2">
          <li>Falha de entrega após suporte e tentativa de solução.</li>
          <li>Incompatibilidade comprovada com requisitos informados na página do produto.</li>
          <li>Cobrança duplicada ou erro operacional.</li>
        </ul>
      </div>

      <div class="rounded-xl border bg-white p-5 space-y-3">
        <h2 class="text-xl font-bold text-gray-900">3. Como solicitar</h2>
        <p class="text-sm">
          Entre em contato pelo e-mail <a class="text-blue-600 hover:underline" :href="mailtoSupport">{{ supportEmail }}</a> informando o número do pedido e o motivo.
        </p>
      </div>

      <div class="rounded-xl border bg-white p-5 space-y-3">
        <h2 class="text-xl font-bold text-gray-900">4. Prazo</h2>
        <p class="text-sm">
          Responderemos sua solicitação em até 2 dias úteis, e o prazo de processamento do reembolso depende do meio de pagamento.
        </p>
      </div>

      <p class="text-sm text-gray-600">
        Eletrokeys LTDA — CNPJ 44.694.365/0001-48.
      </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { supportEmail, siteName } = useSiteBranding()
const baseUrl = useSiteUrl()

const mailtoSupport = computed(() => {
  const email = String(supportEmail || '').trim()
  return email ? `mailto:${email}` : 'mailto:'
})

useSeoMeta({
  title: `Política de Reembolso | ${siteName}`
})

useHead(() => ({
  link: baseUrl ? [{ rel: 'canonical', href: `${baseUrl}/reembolso` }] : []
}))
</script>
