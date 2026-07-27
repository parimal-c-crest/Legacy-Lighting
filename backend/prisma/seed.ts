import { PrismaClient, RoleName, StatusEntityType } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function seedRoles() {
  const roles: RoleName[] = ["Admin", "Manager", "Processor", "Estimator", "Viewer"];
  for (const name of roles) {
    await prisma.role.upsert({ where: { name }, update: {}, create: { name } });
  }
}

async function seedAdminUser() {
  const adminRole = await prisma.role.findUniqueOrThrow({ where: { name: "Admin" } });
  const email = process.env.ADMIN_SEED_EMAIL ?? "admin@legacylighting.local";
  const password = process.env.ADMIN_SEED_PASSWORD ?? "ChangeMe123!";
  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      passwordHash,
      displayName: "Admin",
      roleId: adminRole.id,
    },
  });
}

// Confirmed per docs/1-project/2-requirements.md Q-005a
async function seedRequestTypes() {
  const types = ["New Quote", "Revision", "Takeoff", "Submittal", "Clarification"];
  for (const [i, name] of types.entries()) {
    await prisma.requestType.upsert({
      where: { name },
      update: {},
      create: { name, sortOrder: i },
    });
  }
}

// Confirmed per docs/1-project/2-requirements.md Q-005a
async function seedProjectTypes() {
  const types = ["Multifamily", "Commercial", "Retail", "Hospitality"];
  for (const [i, name] of types.entries()) {
    await prisma.projectType.upsert({
      where: { name },
      update: {},
      create: { name, sortOrder: i },
    });
  }
}

// Per docs/5-modules/task-workbench/3-business-rules.md status transition graph
async function seedStatuses() {
  const taskStatuses = [
    "Not Started",
    "Assigned",
    "In Progress",
    "Awaiting Info",
    "Needs Review",
    "Under Review",
    "Completed",
    "On Hold",
  ];
  const requestStatuses = ["Draft", "New", "Triaged", "Converted"];
  const projectStatuses = ["Active", "At Risk", "Blocked", "Completed"];

  const defs: Array<[StatusEntityType, string[]]> = [
    ["Task", taskStatuses],
    ["Request", requestStatuses],
    ["Project", projectStatuses],
  ];

  for (const [entityType, names] of defs) {
    for (const [i, name] of names.entries()) {
      await prisma.status.upsert({
        where: { entityType_name: { entityType, name } },
        update: {},
        create: { entityType, name, color: "#6b7280", sortOrder: i },
      });
    }
  }
}

// Per FR-SETTINGS-006: minimum 3 active priorities enforced
async function seedPriorities() {
  const priorities = [
    { name: "Urgent", level: 1, color: "#dc2626" },
    { name: "High", level: 2, color: "#ea580c" },
    { name: "Medium", level: 3, color: "#ca8a04" },
    { name: "Low", level: 4, color: "#16a34a" },
  ];
  for (const p of priorities) {
    await prisma.priority.upsert({ where: { level: p.level }, update: {}, create: p });
  }
}

// Locations intentionally NOT seeded — Q-005b is still open (needs Legacy Lighting's real
// office/region list). See docs/1-project/2-requirements.md.

async function main() {
  await seedRoles();
  await seedAdminUser();
  await seedRequestTypes();
  await seedProjectTypes();
  await seedStatuses();
  await seedPriorities();
  console.log("Seed complete. Locations skipped (Q-005b open).");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
