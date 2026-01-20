import { defineEventHandler } from 'h3'
import { clearAdminSession } from '../../../utils/adminSession.js'

export default defineEventHandler(async (event) => {
  clearAdminSession(event)
  return { ok: true }
})
