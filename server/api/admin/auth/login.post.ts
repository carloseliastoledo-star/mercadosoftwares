import { createError, defineEventHandler, readBody } from 'h3'
import { setAdminSession } from '../../../utils/adminSession.js'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const email = String(body?.email || '')
  const password = String(body?.password || '')

  const adminEmail = process.env.ADMIN_EMAIL || ''
  const adminPassword = process.env.ADMIN_PASSWORD || ''

  if (!adminEmail || !adminPassword) {
    throw createError({
      statusCode: 500,
      statusMessage: 'ADMIN_EMAIL/ADMIN_PASSWORD não configurados'
    })
  }

  if (email !== adminEmail || password !== adminPassword) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Credenciais inválidas'
    })
  }

  const session = setAdminSession(event, email)

  return { ok: true, email: session.email }
})
