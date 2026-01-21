import { createError, defineEventHandler, readBody } from 'h3'
import { setAdminSession } from '../../../utils/adminSession.js'
import prisma from '../../../db/prisma'
import { hashPassword, verifyPassword } from '../../../utils/password.js'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const email = String(body?.email || '')
  const password = String(body?.password || '')

  const normalizedEmail = email.trim().toLowerCase()

  try {
    const dbUser = await prisma.adminUser.findUnique({ where: { email: normalizedEmail } })
    if (dbUser) {
      const ok = verifyPassword(password, dbUser.passwordHash)
      if (!ok) {
        throw createError({ statusCode: 401, statusMessage: 'Credenciais inválidas' })
      }

      const session = setAdminSession(event, dbUser.email)
      return { ok: true, email: session.email }
    }
  } catch {
    // Se a tabela ainda não existir (migração pendente), cai no bootstrap por env vars.
  }

  const adminEmail = (process.env.ADMIN_EMAIL || '').trim().toLowerCase()
  const adminPassword = process.env.ADMIN_PASSWORD || ''

  if (!adminEmail || !adminPassword) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Credenciais inválidas'
    })
  }

  if (normalizedEmail !== adminEmail || password !== adminPassword) {
    throw createError({ statusCode: 401, statusMessage: 'Credenciais inválidas' })
  }

  let createdEmail = normalizedEmail
  try {
    const created = await prisma.adminUser.create({
      data: {
        email: normalizedEmail,
        passwordHash: hashPassword(adminPassword),
        role: 'admin'
      }
    })
    createdEmail = created.email
  } catch {
    // Se não conseguir criar (ex: migração pendente), segue logando via env vars.
  }

  const session = setAdminSession(event, createdEmail)
  return { ok: true, email: session.email }
})
