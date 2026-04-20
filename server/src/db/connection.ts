import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";
config();

const connectionString = process.env.DB_URL;

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