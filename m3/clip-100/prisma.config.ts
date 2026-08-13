import path from "node:path";
import { defineConfig } from "prisma/config";

// Prisma 7 moves the datasource URL out of schema.prisma and into this config
// file.
//
// The SQLite database lives at <project>/prisma/dev.db. We build an absolute
// path so the Prisma CLI (migrate/generate) and the running app always point at
// the same file with zero configuration — a fresh clone works without any .env.
//
// There is no seed command here yet — seeding is added in the next clip.
const url = `file:${path.join(process.cwd(), "prisma", "dev.db")}`;

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url,
  },
});
