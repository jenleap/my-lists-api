import { PrismaClient } from "@prisma/client";
import config from './config';

console.log(config.dbUrl);

const prisma = new PrismaClient({
    datasources: {
      db: {
        url: config.dbUrl,
      },
    },
    datasourceUrl: config.dbUrl
  });

export default prisma;