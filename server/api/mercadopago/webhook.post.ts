import { defineEventHandler, readBody } from 'h3'
import { processMercadoPagoPayment } from '../../utils/mercadopagoWebhook.js'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const type = String(body?.type || body?.topic || '')
  const dataId = String(body?.data?.id || body?.id || body?.['data.id'] || '')

  if (type !== 'payment' || !dataId) {
    return { ok: true }
  }

  return await processMercadoPagoPayment(dataId)
})
