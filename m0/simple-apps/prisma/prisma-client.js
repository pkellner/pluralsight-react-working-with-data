import { PrismaClient } from "@prisma/client";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const prisma = new PrismaClient().$extends({
  query: {
    $allModels: {
      async $allOperations({ model, operation, args, query }) {
        await sleep(1000);
        return query(args);
      },
    },
  },
});

export default prisma;
