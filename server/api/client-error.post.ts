export default defineEventHandler(async (event) => {
  const body = await readBody<any>(event).catch(() => ({}))

  console.error('[client][error]', {
    href: body?.href,
    userAgent: body?.userAgent,
    type: body?.type,
    message: body?.message,
    filename: body?.filename,
    lineno: body?.lineno,
    colno: body?.colno,
    stack: body?.stack
  })

  return { ok: true }
})
