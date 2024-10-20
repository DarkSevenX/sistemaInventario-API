import { PrismaClient } from '@prisma/client';

let prisma

try {
  prisma = new PrismaClient();
  await prisma.$connect()
} catch (error) {
  console.error('Failed to connect to Prisma Client', error);
  process.exit(1);
}

export { prisma };
