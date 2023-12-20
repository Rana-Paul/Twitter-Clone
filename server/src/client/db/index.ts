import { PrismaClient } from "prisma/prisma-client"

export const prismaClient = new PrismaClient({log: ['query']})