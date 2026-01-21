import { createError, defineEventHandler, readBody } from 'h3'
import { setAdminSession } from '../../../utils/adminSession.js'
import prisma from '../../../db/prisma'
import { hashPassword, verifyPassword } from '../../../utils/password.js'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const email = String(body?.email || '')
  const password = String(body?.password || '')

  const normalizedEmail = email.trim().toLowerCase()

  const adminEmail = (process.env.ADMIN_EMAIL || '').trim().toLowerCase()
  const adminPassword = process.env.ADMIN_PASSWORD || ''

  try {
    const dbUser = await prisma.adminUser.findUnique({ where: { email: normalizedEmail } })
    if (dbUser) {
      const ok = verifyPassword(password, dbUser.passwordHash)
      if (ok) {
        const session = setAdminSession(event, dbUser.email)
        return { ok: true, email: session.email }
      }

      // Se o usuário existe mas a senha não bate, ainda permitimos o "bootstrap" via env vars
      // para recuperar o acesso do admin.
      if (adminEmail && adminPassword && normalizedEmail === adminEmail && password === adminPassword) {
        await prisma.adminUser.update({
          where: { email: normalizedEmail },
          data: {
            passwordHash: hashPassword(adminPassword),
            role: 'admin'
          }
        })

        const session = setAdminSession(event, normalizedEmail)
        return { ok: true, email: session.email }
      }

      throw createError({ statusCode: 401, statusMessage: 'Credenciais inválidas' })
    }
  } catch {
    // Se a tabela ainda não existir (migração pendente), cai no bootstrap por env vars.
  }

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
    // Se for o admin master, garante que exista/esteja como admin
    const upserted = await prisma.adminUser.upsert({
      where: { email: normalizedEmail },
      create: {
        email: normalizedEmail,
        passwordHash: hashPassword(adminPassword),
        role: 'admin'
      },
      update: {
        passwordHash: hashPassword(adminPassword),
        role: 'admin'
      }
    })
    createdEmail = upserted.email
  } catch {
    // Se não conseguir criar (ex: migração pendente), segue logando via env vars.
  }

  const session = setAdminSession(event, createdEmail)
  return { ok: true, email: session.email }
})
