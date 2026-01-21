<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold">Pedidos</h1>
        <p class="text-sm text-gray-600 mt-1">Lista de pedidos e status.</p>
      </div>
    </div>

    <div v-if="pending" class="text-gray-500">Carregando...</div>
    <div v-else-if="error" class="text-red-600">Não foi possível carregar os pedidos.</div>

    <div v-else class="bg-white rounded shadow overflow-x-auto">
      <table class="w-full text-sm">
        <thead class="bg-gray-100 text-gray-600">
          <tr>
            <th class="p-3 text-left">Pedido</th>
            <th class="p-3 text-left">Produto</th>
            <th class="p-3 text-left">Cliente</th>
            <th class="p-3 text-left">Status</th>
            <th class="p-3 text-left">Criado</th>
            <th class="p-3 text-left">Pago</th>
            <th class="p-3 text-left">Licenças</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="o in orders" :key="o.id" class="border-t">
            <td class="p-3 font-mono text-xs">{{ o.id }}</td>
            <td class="p-3">
              <div class="font-medium">{{ o.produto?.nome }}</div>
              <div class="text-xs text-gray-500">{{ o.produto?.slug }}</div>
            </td>
            <td class="p-3">
              <div class="font-medium">{{ o.customer?.email }}</div>
              <div v-if="o.customer?.nome" class="text-xs text-gray-500">{{ o.customer?.nome }}</div>
              <div v-if="o.customer?.whatsapp" class="text-xs text-gray-500">WhatsApp: {{ o.customer?.whatsapp }}</div>
              <div v-if="o.customer?.cpf" class="text-xs text-gray-500">CPF: {{ o.customer?.cpf }}</div>
            </td>
            <td class="p-3">
              <span
                class="px-2 py-1 rounded"
                :class="o.status === 'PAID' ? 'bg-green-100 text-green-800' : 'bg-gray-100'"
              >
                {{ o.status }}
              </span>
            </td>
            <td class="p-3 text-xs text-gray-600">{{ formatDate(o.criadoEm) }}</td>
            <td class="p-3 text-xs text-gray-600">{{ o.pagoEm ? formatDate(o.pagoEm) : '-' }}</td>
            <td class="p-3">
              <div v-if="!o.licencas?.length" class="text-xs text-gray-500">-</div>
              <div v-else class="space-y-1">
                <div v-for="l in o.licencas" :key="l.id" class="text-xs">
                  <div class="text-gray-500">{{ l.status }}</div>
                  <div class="font-mono break-all">{{ l.chave }}</div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin' })

type OrderDto = {
  id: string
  status: string
  criadoEm: string
  pagoEm: string | null
  emailEnviadoEm: string | null
  mercadoPagoPaymentId: string | null
  produto: { id: string; nome: string; slug: string } | null
  customer: { id: string; email: string; nome: string | null; whatsapp: string | null; cpf: string | null } | null
  licencas: { id: string; chave: string; status: string }[]
}

const { data, pending, error } = await useFetch<{ ok: true; orders: OrderDto[] }>('/api/admin/pedidos', {
  server: false
})

const orders = computed(() => data.value?.orders || [])

function formatDate(input: string) {
  try {
    return new Date(input).toLocaleString('pt-BR')
  } catch {
    return input
  }
}
</script>
