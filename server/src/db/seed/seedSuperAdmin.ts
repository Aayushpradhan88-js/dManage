/**
 * Seed scaffold — creates a super_admin user if none exists.
 * Run:  npx tsx src/db/seed/seedSuperAdmin.ts
 */
import { config } from "dotenv";
config();

import bcrypt from "bcrypt";
import { db } from "../connection";

async function seed() {
  const email = "superadmin@dmanage.local";

  const existing = await db.user.findUnique({
    where: { email },
  });

  if (existing) {
    console.log("⚡ Super admin already exists, skipping seed.");
  } else {
    const hashedPassword = await bcrypt.hash("Changeme@123", 12);

    await db.user.create({
      data: {
        username: "Super Admin",
        email,
        password: hashedPassword,
        systemRole: "super_admin",
        isEmailVerified: true,
      },
    });

    console.log("✅ Super admin user created.");
    console.log(`   Email:    ${email}`);
    console.log("   Password: Changeme@123  (change immediately!)");
  }

  await db.$disconnect();
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
