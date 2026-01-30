<template>
  <section class="bg-gray-100 min-h-screen py-12">
    <div class="max-w-7xl mx-auto px-6">
      <div class="bg-white rounded-2xl border border-gray-200 p-8">
        <h1 class="text-3xl font-extrabold text-gray-900">Entrega Digital</h1>

        <div class="mt-6 space-y-4 text-gray-700 leading-relaxed">
      <p>
        Nossos produtos são digitais. A forma de entrega e as instruções constam na página de cada produto.
      </p>

      <div class="rounded-xl border bg-white p-5 space-y-3">
        <h2 class="text-xl font-bold text-gray-900">Como você recebe</h2>
        <ul class="text-sm list-disc pl-5 space-y-2">
          <li>Envio por e-mail para o endereço cadastrado na compra e/ou disponibilização na área do cliente.</li>
          <li>O envio acontece após a confirmação do pagamento.</li>
          <li>Conteúdo e instruções variam conforme o produto adquirido.</li>
        </ul>
      </div>

      <div class="rounded-xl border bg-white p-5 space-y-3">
        <h2 class="text-xl font-bold text-gray-900">Microsoft 365 (assinatura anual)</h2>
        <div class="text-sm space-y-2">
          <p>
            Quando o produto é uma assinatura do Microsoft 365/Office 365, a entrega é feita por meio de uma conta fornecida
            (login e senha) válida pelo período informado (12 meses).
          </p>
          <ul class="list-disc pl-5 space-y-2">
            <li>Você recebe os dados de acesso (login e senha) por e-mail após a confirmação do pagamento.</li>
            <li>O acesso é feito com a conta fornecida (não é ativação em uma conta Microsoft pessoal já existente).</li>
            <li>As instruções de acesso/instalação acompanham a entrega.</li>
          </ul>
        </div>
      </div>

      <div class="rounded-xl border bg-white p-5 space-y-3">
        <h2 class="text-xl font-bold text-gray-900">Prazo</h2>
        <p class="text-sm">
          O prazo estimado de entrega é informado no momento da compra e na página do produto. Em caso de dúvidas, nosso suporte auxilia rapidamente.
        </p>
      </div>

      <div class="rounded-xl border bg-white p-5 space-y-3">
        <h2 class="text-xl font-bold text-gray-900">Suporte</h2>
        <p class="text-sm">
          Se você não receber a entrega dentro do prazo, entre em contato pelo e-mail
          <a class="text-blue-600 hover:underline" :href="mailtoSupport">{{ supportEmail }}</a>.
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
  title: `Entrega Digital | ${siteName}`
})

useHead(() => ({
  link: baseUrl ? [{ rel: 'canonical', href: `${baseUrl}/entrega-digital` }] : []
}))
</script>
