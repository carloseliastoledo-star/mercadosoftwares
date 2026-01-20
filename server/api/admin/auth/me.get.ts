import { defineEventHandler } from 'h3'
import { requireAdminSession } from '../../../utils/adminSession.js'

export default defineEventHandler(async (event) => {
  const session = requireAdminSession(event)
  return { ok: true, email: session.email }
})
