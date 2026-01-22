<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()

const googleAdsConversionId = computed(() => String(config.public.googleAdsConversionId || ''))

useHead(() => {
  const id = googleAdsConversionId.value
  if (!id) return {}

  return {
    script: [
      {
        src: `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`,
        async: true
      },
      {
        children: `window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', '${id}');`
      }
    ]
  }
})
</script>
