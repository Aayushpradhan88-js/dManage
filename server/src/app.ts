import express from "express";
import type { NextFunction, Request, Response } from "express";
import cors from "cors";
import authRouter from "./global/auth/auth-router.ts";
import platformRouter from "./modules/features/platform/platformRoutes.ts";
import superAdminRouter from "./modules/features/super-admin/superAdminRoutes.ts";

const app = express();

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log("Incoming frontend request origin:", req.headers.origin);
  console.log("Incoming Request..............");
  next();
});

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:3002",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRouter);
app.use("/api/platform", platformRouter);
app.use("/api/super-admin", superAdminRouter);

export default app
