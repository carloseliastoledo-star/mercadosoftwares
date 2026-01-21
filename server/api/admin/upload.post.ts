import { mkdir, writeFile } from 'fs/promises'
import { existsSync } from 'fs'
import { join } from 'path'
import { createError, defineEventHandler, readMultipartFormData } from 'h3'

export default defineEventHandler(async (event) => {
  const formData = await readMultipartFormData(event)

  if (!formData) {
    throw createError({ statusCode: 400, statusMessage: 'Arquivo não enviado' })
  }

  const file = formData.find(f => f.name === 'file')

  if (!file || !file.filename) {
    throw createError({ statusCode: 400, statusMessage: 'Arquivo inválido' })
  }

  const fileName = `${Date.now()}-${file.filename}`
  const outputPublicDir = join(process.cwd(), '.output/public')
  const uploadsBase = existsSync(outputPublicDir) ? outputPublicDir : join(process.cwd(), 'app/public')
  const uploadsDir = join(uploadsBase, 'uploads')
  const filePath = join(uploadsDir, fileName)

  await mkdir(uploadsDir, { recursive: true })

  await writeFile(filePath, file.data)

  return {
    url: `/uploads/${fileName}`
  }
})
