import { PrismaClient } from '@/generated/noc-client'

const globalForNocPrisma = global as unknown as { nocPrisma: PrismaClient }

export const nocPrisma = globalForNocPrisma.nocPrisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForNocPrisma.nocPrisma = nocPrisma
