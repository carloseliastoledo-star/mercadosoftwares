import prisma from '#root/server/db/prisma'
import { requireAdminSession } from '#root/server/utils/adminSession'
import { createError } from 'h3'
import { autoTranslateText } from '#root/server/utils/autoTranslate'

type Lang = 'en' | 'es' | 'it' | 'fr'

function isBlank(value: unknown): boolean {
  return typeof value !== 'string' || value.trim() === ''
}

export default defineEventHandler(async (event) => {
  requireAdminSession(event)

  const id = String(event.context.params?.id || '').trim()
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'ID não informado'
    })
  }

  const body = await readBody(event).catch(() => ({} as any))
  const overwrite = Boolean((body as any)?.overwrite)

  const langs: Lang[] = Array.isArray((body as any)?.langs)
    ? (body as any).langs.map((x: any) => String(x).trim().toLowerCase()).filter((x: any) => x === 'en' || x === 'es' || x === 'it' || x === 'fr')
    : ['en', 'es', 'it', 'fr']

  const product = await (prisma as any).produto.findUnique({
    where: { id },
    select: {
      id: true,
      nome: true,
      nomeEn: true,
      nomeEs: true,
      nomeIt: true,
      nomeFr: true,
      descricao: true,
      descricaoEn: true,
      descricaoEs: true,
      descricaoIt: true,
      descricaoFr: true,
      tutorialTitulo: true,
      tutorialTituloEn: true,
      tutorialTituloEs: true,
      tutorialTituloIt: true,
      tutorialTituloFr: true,
      tutorialSubtitulo: true,
      tutorialSubtituloEn: true,
      tutorialSubtituloEs: true,
      tutorialSubtituloIt: true,
      tutorialSubtituloFr: true,
      tutorialConteudo: true,
      tutorialConteudoEn: true,
      tutorialConteudoEs: true,
      tutorialConteudoIt: true,
      tutorialConteudoFr: true
    }
  })

  if (!product) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Produto não encontrado'
    })
  }

  const data: Record<string, any> = {}

  for (const lang of langs) {
    const nameKey = `nome${lang === 'en' ? 'En' : lang === 'es' ? 'Es' : lang === 'it' ? 'It' : 'Fr'}`
    const descKey = `descricao${lang === 'en' ? 'En' : lang === 'es' ? 'Es' : lang === 'it' ? 'It' : 'Fr'}`
    const ttKey = `tutorialTitulo${lang === 'en' ? 'En' : lang === 'es' ? 'Es' : lang === 'it' ? 'It' : 'Fr'}`
    const tsKey = `tutorialSubtitulo${lang === 'en' ? 'En' : lang === 'es' ? 'Es' : lang === 'it' ? 'It' : 'Fr'}`
    const tcKey = `tutorialConteudo${lang === 'en' ? 'En' : lang === 'es' ? 'Es' : lang === 'it' ? 'It' : 'Fr'}`

    if (overwrite || isBlank((product as any)[nameKey])) {
      const translated = autoTranslateText((product as any).nome, { lang })
      if (translated && translated.trim()) data[nameKey] = translated
    }

    if (overwrite || isBlank((product as any)[descKey])) {
      const base = typeof (product as any).descricao === 'string' ? (product as any).descricao : ''
      const translated = autoTranslateText(base, { lang })
      if (translated && translated.trim()) data[descKey] = translated
    }

    if (overwrite || isBlank((product as any)[ttKey])) {
      const translated = autoTranslateText((product as any).tutorialTitulo, { lang })
      if (translated && translated.trim()) data[ttKey] = translated
    }

    if (overwrite || isBlank((product as any)[tsKey])) {
      const translated = autoTranslateText((product as any).tutorialSubtitulo, { lang })
      if (translated && translated.trim()) data[tsKey] = translated
    }

    if (overwrite || isBlank((product as any)[tcKey])) {
      const translated = autoTranslateText((product as any).tutorialConteudo, { lang })
      if (translated && translated.trim()) data[tcKey] = translated
    }
  }

  if (!Object.keys(data).length) {
    return { ok: true, updated: false, message: 'Nada para preencher (já existe tradução ou campos vazios)' }
  }

  const updated = await (prisma as any).produto.update({
    where: { id },
    data
  })

  return { ok: true, updated: true, produto: updated }
})
