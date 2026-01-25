import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const cats = [
    { nome: 'Office', slug: 'office' },
    { nome: 'Autodesk', slug: 'autodesk' },
    { nome: 'Microsoft Windows', slug: 'microsoft-windows' },
    { nome: 'Project & Visio', slug: 'project&visio' },
    { nome: 'Windows Server', slug: 'windows-server' }
  ]

  for (const c of cats) {
    await prisma.categoria.upsert({
      where: { slug: c.slug },
      create: c,
      update: { nome: c.nome }
    })
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
    console.log('Seed categorias OK')
  })
  .catch(async (e) => {
    console.error(e)
    try {
      await prisma.$disconnect()
    } catch {}
    process.exit(1)
  })
