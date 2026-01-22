<script setup lang="ts">
definePageMeta({ layout: 'admin' })

const form = reactive({
  googleAdsConversionId: '',
  googleAdsConversionLabel: ''
})

const loading = ref(true)
const saving = ref(false)
const message = ref('')
const errorMsg = ref('')

onMounted(async () => {
  loading.value = true
  message.value = ''
  errorMsg.value = ''

  try {
    const res: any = await $fetch('/api/admin/settings')
    const s = res?.settings || {}
    form.googleAdsConversionId = s.googleAdsConversionId ?? ''
    form.googleAdsConversionLabel = s.googleAdsConversionLabel ?? ''
  } catch (err: any) {
    errorMsg.value = err?.data?.statusMessage || err?.message || 'Erro ao carregar configurações'
  } finally {
    loading.value = false
  }
})

async function salvar() {
  saving.value = true
  message.value = ''
  errorMsg.value = ''

  try {
    await $fetch('/api/admin/settings', {
      method: 'PUT',
      body: {
        googleAdsConversionId: form.googleAdsConversionId,
        googleAdsConversionLabel: form.googleAdsConversionLabel
      }
    })
    message.value = 'Configurações salvas com sucesso.'
  } catch (err: any) {
    errorMsg.value = err?.data?.statusMessage || err?.message || 'Erro ao salvar configurações'
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <div class="space-y-6">
    <div class="bg-white rounded shadow p-6">
      <h1 class="text-2xl font-bold">Configurações</h1>
      <p class="mt-2 text-gray-600">Google Ads</p>
    </div>

    <div v-if="loading" class="text-gray-500">Carregando...</div>

    <div v-else class="bg-white rounded shadow p-6 space-y-4 max-w-2xl">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Google Ads Conversion ID</label>
        <input v-model="form.googleAdsConversionId" class="w-full border p-2 rounded" placeholder="Ex: AW-123456789" />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Google Ads Conversion Label</label>
        <input v-model="form.googleAdsConversionLabel" class="w-full border p-2 rounded" placeholder="Ex: AbCdEfGhIjkLmNoPqRsT" />
      </div>

      <div v-if="message" class="text-sm text-green-700">{{ message }}</div>
      <div v-if="errorMsg" class="text-sm text-red-600">{{ errorMsg }}</div>

      <button
        type="button"
        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-60"
        :disabled="saving"
        @click="salvar"
      >
        {{ saving ? 'Salvando...' : 'Salvar' }}
      </button>
    </div>
  </div>
</template>
