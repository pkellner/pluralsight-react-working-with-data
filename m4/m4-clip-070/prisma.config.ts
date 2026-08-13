import path from "node:path";
import { defineConfig } from "prisma/config";

// Prisma 7 moves the datasource URL and the seed command out of schema.prisma
// and package.json and into this config file.
//
// The SQLite database lives at <project>/prisma/dev.db. We build an absolute
// path so the Prisma CLI (migrate/seed) and the running app always point at the
// same file with zero configuration — a fresh clone works without any .env.
const url = `file:${path.join(process.cwd(), "prisma", "dev.db")}`;

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx src/lib/prisma/seed.ts",
  },
  datasource: {
    url,
  },
});
