<script setup lang="ts">
definePageMeta({ layout: 'admin' })

const form = reactive({
  nome: '',
  slug: '',
  preco: '',
  descricao: '',
  ativo: true,
  imagem: '',
  googleAdsConversionLabel: '',
  googleAdsConversionValue: '',
  googleAdsConversionCurrency: 'BRL',
  tutorialTitulo: '',
  tutorialSubtitulo: '',
  tutorialConteudo: ''
})

const uploadLoading = ref(false)
const uploadError = ref('')

async function uploadImagem(event) {
  const file = event.target.files[0]
  if (!file) return

  const formData = new FormData()
  formData.append('file', file)

  uploadLoading.value = true
  uploadError.value = ''

  try {
    const res = await $fetch('/api/admin/upload', {
      method: 'POST',
      body: formData
    })

    form.imagem = res.url
  } catch (err: any) {
    uploadError.value = err?.data?.statusMessage || err?.message || 'Erro ao enviar imagem'
  } finally {
    uploadLoading.value = false
  }
}

async function salvar() {
  await $fetch('/api/admin/produtos', {
    method: 'POST',
    body: form
  })

  navigateTo('/admin/produtos')
}
</script>

<template>
  <div class="grid grid-cols-3 gap-6">

    <!-- CONTEÚDO -->
    <div class="col-span-2 bg-white p-6 rounded shadow space-y-4">

      <input
        v-model="form.nome"
        placeholder="Nome do produto"
        class="w-full text-2xl border p-3 rounded"
      />

      <textarea
        v-model="form.descricao"
        placeholder="Descrição completa"
        rows="10"
        class="w-full border p-3 rounded"
      />

      <input
        v-model="form.tutorialTitulo"
        placeholder="Título do tutorial (ex: Tutorial de Ativação)"
        class="w-full border p-3 rounded"
      />

      <input
        v-model="form.tutorialSubtitulo"
        placeholder="Subtítulo do tutorial"
        class="w-full border p-3 rounded"
      />

      <textarea
        v-model="form.tutorialConteudo"
        placeholder="Conteúdo do tutorial (passo a passo)"
        rows="10"
        class="w-full border p-3 rounded"
      />
    </div>

    <!-- SIDEBAR -->
    <div class="bg-white p-6 rounded shadow space-y-4">

      <input
        v-model="form.slug"
        placeholder="Slug (ex: windows-11-pro)"
        class="w-full border p-2 rounded"
      />

      <input
        v-model="form.preco"
        placeholder="Preço"
        class="w-full border p-2 rounded"
      />

      <label class="flex items-center gap-2 text-sm">
        <input v-model="form.ativo" type="checkbox" class="rounded" />
        Ativo (aparece no site)
      </label>

      <!-- UPLOAD DE IMAGEM -->
      <div>
        <label class="text-sm font-semibold">Imagem do produto</label>

        <input
          type="file"
          @change="uploadImagem"
          class="w-full text-sm"
          accept="image/*"
        />

        <div v-if="uploadLoading" class="text-xs text-gray-500 mt-2">Enviando imagem...</div>
        <div v-if="uploadError" class="text-xs text-red-600 mt-2">{{ uploadError }}</div>

        <img
          v-if="form.imagem"
          :src="form.imagem"
          class="mt-2 rounded border"
        />
      </div>

      <div class="space-y-2">
        <label class="text-sm font-semibold">Google Ads</label>

        <input
          v-model="form.googleAdsConversionLabel"
          placeholder="Conversion Label (ex: AbCdEfGhIjkLmNoPqRsT)"
          class="w-full border p-2 rounded"
        />

        <input
          v-model="form.googleAdsConversionValue"
          placeholder="Conversion Value (opcional)"
          class="w-full border p-2 rounded"
        />

        <input
          v-model="form.googleAdsConversionCurrency"
          placeholder="Currency (ex: BRL)"
          class="w-full border p-2 rounded"
        />
      </div>

      <button
        @click="salvar"
        class="w-full bg-blue-600 text-white py-2 rounded"
      >
        Publicar
      </button>

    </div>

  </div>
</template>
