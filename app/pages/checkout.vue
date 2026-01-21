<template>
  <section class="bg-gray-50 min-h-screen py-20">
    <div class="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12">
      <!-- PRODUTO -->
      <div v-if="product" class="bg-white rounded-3xl shadow p-10">
        <div class="flex gap-8 items-center">
          <img
            :src="product.image"
            :alt="product.name"
            class="w-32 object-contain"
          />

          <div>
            <h1 class="text-2xl font-bold mb-2">
              {{ product.name }}
            </h1>
            <p class="text-gray-600">
              {{ product.shortDescription }}
            </p>
          </div>
        </div>

        <div class="mt-10 grid grid-cols-2 gap-4 text-sm">
          <div class="flex items-center gap-2">⚡ Envio imediato</div>
          <div class="flex items-center gap-2">🛡️ Licença original</div>
          <div class="flex items-center gap-2">♻️ Reinstalação permitida</div>
          <div class="flex items-center gap-2">💬 Suporte especializado</div>
        </div>
      </div>

      <!-- RESUMO -->
      <div class="bg-white rounded-3xl shadow p-10">
        <h2 class="text-xl font-bold mb-6">
          Resumo do Pedido
        </h2>

        <div v-if="product" class="space-y-4 mb-6">
          <div class="flex justify-between">
            <span>{{ product.name }}</span>
            <span>R$ {{ product.price.toFixed(2).replace('.', ',') }}</span>
          </div>

          <div class="flex justify-between text-sm text-gray-500">
            <span>Desconto promocional</span>
            <span>-40%</span>
          </div>

          <!-- PARCELAMENTO VISÍVEL -->
          <div class="flex justify-between text-sm text-gray-600">
            <span>Parcelamento</span>
            <span>
              12x de R$ {{
                (product.price / 12)
                  .toFixed(2)
                  .replace('.', ',')
              }}
            </span>
          </div>

          <div class="border-t pt-4 flex justify-between font-bold text-lg">
            <span>Total</span>
            <span class="text-blue-600">
              R$ {{ product.price.toFixed(2).replace('.', ',') }}
            </span>
          </div>
        </div>

        <!-- URGÊNCIA -->
        <div
          class="bg-blue-50 border border-blue-200 text-blue-700 p-4 rounded-xl text-sm mb-6"
        >
          🔥 Oferta por tempo limitado — preço pode mudar a qualquer momento
        </div>

     <!-- SELOS DE CARTÃO -->
<div class="flex justify-center gap-4 my-6 text-sm font-semibold text-gray-500">
  <span class="px-3 py-1 border rounded">VISA</span>
  <span class="px-3 py-1 border rounded">Mastercard</span>
  <span class="px-3 py-1 border rounded">Amex</span>
</div>


        <div class="mt-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Email para receber a licença
          </label>
          <input
            v-model="customerEmail"
            type="email"
            placeholder="seuemail@exemplo.com"
            class="w-full border p-3 rounded-xl"
          />
          <p class="text-xs text-gray-500 mt-2">
            Use um email válido. Após a confirmação do pagamento, sua licença será enviada automaticamente.
          </p>
        </div>

        <div class="mt-6 flex gap-2">
          <button
            @click="paymentTab = 'pix'"
            :class="paymentTab === 'pix' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'"
            class="flex-1 py-3 rounded-xl text-sm font-semibold"
          >
            PIX
          </button>
          <button
            @click="paymentTab = 'card'"
            :class="paymentTab === 'card' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'"
            class="flex-1 py-3 rounded-xl text-sm font-semibold"
          >
            Cartão
          </button>
        </div>

        <template v-if="paymentTab === 'pix'">
          <button
            :disabled="pixLoading"
            @click="goToPix"
            class="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg py-4 rounded-xl shadow-lg transition disabled:opacity-60"
          >
            {{ pixLoading ? 'Gerando PIX...' : 'Pagar com PIX' }}
          </button>

          <div v-if="pixError" class="mt-4 text-sm text-red-600">
            {{ pixError }}
          </div>

          <div v-if="pix.qrCodeBase64 || pix.qrCode" class="mt-6 bg-gray-50 border rounded-xl p-4">
            <div class="font-semibold mb-3">PIX gerado</div>
            <img v-if="pix.qrCodeBase64" :src="pix.qrCodeBase64" alt="QR Code PIX" class="w-56 mx-auto" />

            <div v-if="pix.qrCode" class="mt-4">
              <div class="text-sm font-medium text-gray-700 mb-2">Copia e cola</div>
              <textarea
                readonly
                class="w-full border rounded-lg p-3 text-xs"
                rows="4"
              >{{ pix.qrCode }}</textarea>
            </div>
          </div>
        </template>

        <template v-else>
          <div class="mt-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              CPF do titular
            </label>
            <input
              v-model="cpf"
              inputmode="numeric"
              placeholder="000.000.000-00"
              class="w-full border p-3 rounded-xl"
            />
          </div>

          <div v-if="cardSdkError" class="mt-4 text-sm text-red-600">
            {{ cardSdkError }}
          </div>

          <div class="mt-6 bg-gray-50 border rounded-xl p-4">
            <div class="font-semibold mb-3">Dados do cartão</div>
            <div id="mp-card-form" class="space-y-3">
              <div class="grid grid-cols-1 gap-3">
                <div>
                  <label class="block text-xs text-gray-600 mb-1">Número do cartão</label>
                  <input id="form-cardNumber" class="w-full border p-3 rounded-xl" />
                </div>
                <div>
                  <label class="block text-xs text-gray-600 mb-1">Nome no cartão</label>
                  <input id="form-cardholderName" class="w-full border p-3 rounded-xl" />
                </div>
              </div>

              <div class="grid grid-cols-3 gap-3">
                <div>
                  <label class="block text-xs text-gray-600 mb-1">Mês</label>
                  <input id="form-cardExpirationMonth" class="w-full border p-3 rounded-xl" />
                </div>
                <div>
                  <label class="block text-xs text-gray-600 mb-1">Ano</label>
                  <input id="form-cardExpirationYear" class="w-full border p-3 rounded-xl" />
                </div>
                <div>
                  <label class="block text-xs text-gray-600 mb-1">CVV</label>
                  <input id="form-securityCode" class="w-full border p-3 rounded-xl" />
                </div>
              </div>

              <div class="grid grid-cols-1 gap-3">
                <div>
                  <label class="block text-xs text-gray-600 mb-1">Bandeira</label>
                  <select id="form-paymentMethodId" class="w-full border p-3 rounded-xl"></select>
                </div>
                <div>
                  <label class="block text-xs text-gray-600 mb-1">Parcelas</label>
                  <select id="form-installments" class="w-full border p-3 rounded-xl"></select>
                </div>
                <div>
                  <label class="block text-xs text-gray-600 mb-1">Emissor</label>
                  <select id="form-issuer" class="w-full border p-3 rounded-xl"></select>
                </div>
                <input id="form-identificationType" type="hidden" value="CPF" />
                <input id="form-identificationNumber" :value="cpf" type="hidden" />
              </div>
            </div>
          </div>

          <button
            :disabled="cardLoading"
            @click="payWithCard"
            class="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg py-4 rounded-xl shadow-lg transition disabled:opacity-60"
          >
            {{ cardLoading ? 'Processando...' : 'Pagar com Cartão' }}
          </button>

          <div v-if="cardError" class="mt-4 text-sm text-red-600">
            {{ cardError }}
          </div>
        </template>

        <p class="text-xs text-gray-500 text-center mt-4">
          Pagamento 100% seguro • Processado pelo Mercado Pago
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const config = useRuntimeConfig()

const slug = computed(() => String(route.query.product || ''))

const { data } = await useFetch(
  () => (slug.value ? `/api/products/${slug.value}` : null),
  { server: false }
)

const product = computed(() => {
  const p: any = data.value
  if (!p) return null

  return {
    ...p,
    shortDescription: p.shortDescription ?? p.description ?? ''
  }
})

const paymentTab = ref<'pix' | 'card'>('pix')

const customerEmail = ref('')
const pixLoading = ref(false)
const pixError = ref('')
const pix = reactive<{ qrCode: string; qrCodeBase64: string | null }>({
  qrCode: '',
  qrCodeBase64: null
})

const cpf = ref('')
const cardLoading = ref(false)
const cardError = ref('')
const cardSdkError = ref('')
let mpCardForm: any = null

function loadMpSdk() {
  return new Promise<void>((resolve, reject) => {
    if (typeof window === 'undefined') return reject(new Error('no window'))
    if ((window as any).MercadoPago) return resolve()

    const script = document.createElement('script')
    script.src = 'https://sdk.mercadopago.com/js/v2'
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Falha ao carregar SDK Mercado Pago'))
    document.head.appendChild(script)
  })
}

async function initCardForm() {
  if (typeof window === 'undefined') return
  if (mpCardForm) return

  const publicKey = String(config.public.mercadopagoPublicKey || '')
  if (!publicKey) {
    cardSdkError.value = 'MERCADOPAGO_PUBLIC_KEY não configurada'
    return
  }

  try {
    await loadMpSdk()
    const MercadoPago = (window as any).MercadoPago
    const mp = new MercadoPago(publicKey, { locale: 'pt-BR' })

    mpCardForm = mp.cardForm({
      amount: String(product.value?.price || 0),
      autoMount: true,
      form: {
        id: 'mp-card-form',
        cardholderName: { id: 'form-cardholderName' },
        cardNumber: { id: 'form-cardNumber' },
        cardExpirationMonth: { id: 'form-cardExpirationMonth' },
        cardExpirationYear: { id: 'form-cardExpirationYear' },
        securityCode: { id: 'form-securityCode' },
        installments: { id: 'form-installments' },
        identificationType: { id: 'form-identificationType' },
        identificationNumber: { id: 'form-identificationNumber' },
        issuer: { id: 'form-issuer' },
        paymentMethodId: { id: 'form-paymentMethodId' }
      },
      callbacks: {
        onFormMounted: (error: any) => {
          if (error) cardSdkError.value = 'Erro ao montar formulário do cartão'
        }
      }
    })
  } catch {
    cardSdkError.value = 'Falha ao iniciar checkout com cartão'
  }
}

watch(paymentTab, async (tab) => {
  if (tab === 'card') {
    await nextTick()
    await initCardForm()
  }
})

async function payWithCard() {
  if (!product.value) return
  cardLoading.value = true
  cardError.value = ''

  try {
    if (!mpCardForm) {
      await initCardForm()
    }

    if (!mpCardForm) {
      throw new Error('Checkout de cartão indisponível')
    }

    const cardData = mpCardForm.getCardFormData()
    const res: any = await $fetch('/api/mercadopago/card', {
      method: 'POST',
      body: {
        produtoId: product.value.id,
        email: customerEmail.value,
        token: cardData.token,
        payment_method_id: cardData.paymentMethodId,
        issuer_id: cardData.issuerId,
        installments: Number(cardData.installments || 1),
        identification: {
          type: 'CPF',
          number: cpf.value
        }
      }
    })

    if (String(res.status || '').toLowerCase() === 'approved') {
      navigateTo('/sucesso')
    } else {
      cardError.value = 'Pagamento enviado para análise. Aguarde a confirmação.'
    }
  } catch (err: any) {
    cardError.value = err?.data?.statusMessage || err?.message || 'Falha ao processar pagamento'
  } finally {
    cardLoading.value = false
  }
}

async function goToPix() {
  if (!product.value) return

  pixLoading.value = true
  pixError.value = ''
  pix.qrCode = ''
  pix.qrCodeBase64 = null

  try {
    const res: any = await $fetch('/api/mercadopago/pix', {
      method: 'POST',
      body: {
        produtoId: product.value.id,
        email: customerEmail.value
      }
    })

    pix.qrCode = res.qrCode || ''
    pix.qrCodeBase64 = res.qrCodeBase64 || null
  } catch (err: any) {
    pixError.value = err?.data?.statusMessage || 'Não foi possível gerar o PIX'
  } finally {
    pixLoading.value = false
  }
}
</script>
