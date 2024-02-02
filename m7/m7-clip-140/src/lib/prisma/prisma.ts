// Prisma client to be used in the application for all database queries
//
// If you want logging of SQL statements, set the following environment variables:
//   LOGSQLSTATEMENT=true
//
// If you want logging of SQL execution time, set the following environment variables:
//   LOGSQLMS=true
//
// If you want information about the SQL statements to be logged to the console, set the following environment variables:
//   PRISMA_EVENT_QUERY=true
//   PRISMA_STDOUT_ERROR=true
//   PRISMA_STDOUT_INFO=true
//   PRISMA_STDOUT_WARN=true
//
// Example usage:
//   import prisma from "@/lib/prisma";
//   ...
//   const speakers = await prisma.speaker.findMany();
//   ...
//
// For more information, see the Prisma documentation:
//   https://www.prisma.io/docs/concepts/components/prisma-client
//

import { PrismaClient } from "@prisma/client";

type LogOption = {
  emit: "event" | "stdout";
  level: "query" | "error" | "info" | "warn";
};

function getPrismaOptions(): {
  log: LogOption[];
} {
  // Convert environment variables to boolean, and set default values
  const queryLogging = process.env.PRISMA_EVENT_QUERY !== "false"; // default true
  const errorLogging = process.env.PRISMA_STDOUT_ERROR !== "false"; // default true
  const infoLogging = process.env.PRISMA_STDOUT_INFO === "true"; // default false
  const warnLogging = process.env.PRISMA_STDOUT_WARN === "true"; // default false

  const logOptions: LogOption[] = [];

  if (queryLogging) {
    logOptions.push({
      emit: "event",
      level: "query",
    });
  }

  if (errorLogging) {
    logOptions.push({
      emit: "stdout",
      level: "error",
    });
  }

  if (infoLogging) {
    logOptions.push({
      emit: "stdout",
      level: "info",
    });
  }

  if (warnLogging) {
    logOptions.push({
      emit: "stdout",
      level: "warn",
    });
  }

  return {
    log: logOptions,
  };
}

const prismaOptions = getPrismaOptions();

let prisma: PrismaClient;
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient(prismaOptions);
} else {
  // @ts-ignore
  if (!global.prisma) {
    // @ts-ignore
    global.prisma = new PrismaClient(prismaOptions);
  }
  // @ts-ignore
  prisma = global.prisma;
}

// @ts-ignore
prisma.$on("query", (e) => {
  // @ts-ignore
  if (e.query.toString().includes("SELECT UserImage")) return null;

  if (process.env.LOGSQLSTATEMENT === "true") {
    // @ts-ignore
    console.log("Query: " + e.query);
    // @ts-ignore
    console.log("Params: " + e.params);
  }

  if (process.env.LOGSQLMS === "true") {
    // @ts-ignore
    console.log("Duration: " + e.duration + "ms");
  }
});

export default prisma;
