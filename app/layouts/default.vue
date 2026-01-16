<template>
  <div class="min-h-screen flex flex-col">
    <!-- HEADER -->
    <AppHeader />

    <!-- CONTEÚDO DAS PÁGINAS -->
    <main class="flex-1 pt-20 px-6">
      <slot />
    </main>

    <!-- FOOTER -->
    <AppFooter />
  </div>
</template>
