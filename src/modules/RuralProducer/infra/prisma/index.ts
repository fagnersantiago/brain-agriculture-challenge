import "reflect-metadata"
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
console.log('Prisma instance created successfully.');
export { prisma };