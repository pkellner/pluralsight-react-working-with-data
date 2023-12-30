import { PrismaClient } from "@prisma/client";

type LogOption = {
  emit: "event" | "stdout";
  level: "query" | "error" | "info" | "warn";
};

function getPrismaOptions(): { log: LogOption[] } {
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
  if (e.query.includes("UserImage")) {
    return;
  }

  // @ts-ignore
  if (e.query.toString().includes("SELECT UserImage")) return null;

  if (process.env.LOGSQLSTATEMENT == "true") {
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
