import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";
import { DATABASE_URL } from "../config/env";
config();

const connectionString = DATABASE_URL

if (!connectionString) {
  throw new Error("DB_URL environment variable is not set");
}

export const db = new PrismaClient({
  datasources: {
    db: {
      url: connectionString,
    },
  },
});
