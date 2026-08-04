// Prisma client singleton used across the app for all database queries.
//
// Prisma 7 requires an explicit driver adapter. For SQLite we use
// better-sqlite3. The generated client now lives under src/generated/prisma
// (configured via the `output` field in prisma/schema.prisma).
//
// Example usage:
//   import prisma from "@/lib/prisma/prisma";
//   const speakers = await prisma.speaker.findMany();
//
// For more information, see the Prisma documentation:
//   https://www.prisma.io/docs/orm/overview/databases/database-drivers

import path from "node:path";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../../generated/prisma/client";

// Absolute path to <project>/prisma/dev.db so the app reads the same file the
// Prisma CLI writes during migrate/seed. Matches datasource in prisma.config.ts.
const url = `file:${path.join(process.cwd(), "prisma", "dev.db")}`;

function createPrismaClient() {
  const adapter = new PrismaBetterSqlite3({ url });
  return new PrismaClient({ adapter });
}

// Reuse a single client across hot reloads in development.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
