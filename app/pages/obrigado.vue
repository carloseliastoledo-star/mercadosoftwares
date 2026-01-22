<script setup lang="ts">
const route = useRoute()
const config = useRuntimeConfig()

const orderId = computed(() => String(route.query.orderId || ''))
const paymentId = computed(() => String(route.query.paymentId || ''))

const googleAdsConversionId = computed(() => String(config.public.googleAdsConversionId || ''))
const googleAdsConversionLabel = computed(() => String(config.public.googleAdsConversionLabel || ''))

onMounted(() => {
  const id = googleAdsConversionId.value
  const label = googleAdsConversionLabel.value

  if (!id || !label) return
  if (typeof window === 'undefined') return

  const gtag = (window as any).gtag
  if (typeof gtag !== 'function') return

  gtag('event', 'conversion', {
    send_to: `${id}/${label}`,
    transaction_id: orderId.value || undefined
  })
})
</script>

<template>
  <section class="bg-gray-50 min-h-screen py-16">
    <div class="max-w-2xl mx-auto px-6">
      <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
        <h1 class="text-3xl font-bold text-gray-900">Obrigado pela sua compra!</h1>
        <p class="mt-3 text-gray-700">
          Seu pagamento foi confirmado.
        </p>

        <div class="mt-6 space-y-2 text-sm text-gray-700">
          <div>
            Enviamos sua licença e instruções para o e-mail informado na compra.
          </div>
          <div>
            Se não encontrar, verifique também a caixa de spam.
          </div>
        </div>

        <div v-if="orderId || paymentId" class="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm">
          <div v-if="orderId" class="text-gray-700">
            <span class="font-semibold">Pedido:</span> {{ orderId }}
          </div>
          <div v-if="paymentId" class="text-gray-700 mt-1">
            <span class="font-semibold">Pagamento:</span> {{ paymentId }}
          </div>
        </div>

        <div class="mt-8 flex gap-3">
          <NuxtLink to="/" class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-semibold">
            Voltar para a Home
          </NuxtLink>
          <NuxtLink to="/produtos" class="bg-white hover:bg-gray-50 text-gray-900 px-5 py-3 rounded-xl font-semibold border border-gray-200">
            Ver produtos
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
