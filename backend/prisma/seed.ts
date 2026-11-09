import 'dotenv/config';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import bcrypt from 'bcryptjs';
import { CatalogDirection, PrismaClient, UserRole } from '@prisma/client';

const prisma = new PrismaClient();

type CatalogGroup = Record<string, Array<[string, string, string, string?]>>;
type CatalogData = Record<string, CatalogGroup>;
type SeedUser = { role: UserRole; name: string; email: string; password: string };

async function loadCatalog(): Promise<CatalogData> {
  const sourcePath = resolve(process.cwd(), 'prisma/data/catalogo.json');
  const source = await readFile(sourcePath, 'utf8');
  return JSON.parse(source) as CatalogData;
}

async function seedCatalog() {
  const catalog = await loadCatalog();
  let count = 0;
  for (const [category, directions] of Object.entries(catalog)) {
    for (const [direction, entries] of Object.entries(directions)) {
      for (const [code, title, description, note] of entries) {
        await prisma.catalogItem.upsert({
          where: {
            category_direction_code: {
              category,
              direction: direction.toUpperCase() as CatalogDirection,
              code,
            },
          },
          update: { title, description, note: note ?? null, active: true },
          create: {
            category,
            direction: direction.toUpperCase() as CatalogDirection,
            code,
            title,
            description,
            note: note ?? null,
          },
        });
        count += 1;
      }
    }
  }
  console.log(`Catálogo cargado o actualizado: ${count} numerales.`);
}

function readSeedUser(role: UserRole, nameEnv: string, emailEnv: string, passwordEnv: string): SeedUser {
  const email = process.env[emailEnv]?.trim().toLowerCase();
  const password = process.env[passwordEnv];
  if (!email || !password || password.length < 12) {
    throw new Error(`${emailEnv} y ${passwordEnv} son obligatorios; la contraseña requiere 12 caracteres.`);
  }

  return {
    role,
    name: process.env[nameEnv]?.trim() || (role === UserRole.ADMIN ? 'Administrador de prueba' : 'Usuario de prueba'),
    email,
    password,
  };
}

async function seedTestUser(user: SeedUser) {
  const passwordHash = await bcrypt.hash(user.password, 12);
  await prisma.user.upsert({
    where: { email: user.email },
    update: { name: user.name, passwordHash, role: user.role },
    create: { name: user.name, email: user.email, passwordHash, role: user.role },
  });
  console.log(`Cuenta ${user.role.toLowerCase()} de prueba preparada: ${user.email}`);
}

try {
  const admin = readSeedUser(UserRole.ADMIN, 'SEED_ADMIN_NAME', 'SEED_ADMIN_EMAIL', 'SEED_ADMIN_PASSWORD');
  const user = readSeedUser(UserRole.USER, 'SEED_USER_NAME', 'SEED_USER_EMAIL', 'SEED_USER_PASSWORD');
  await seedCatalog();
  await seedTestUser(admin);
  await seedTestUser(user);
} finally {
  await prisma.$disconnect();
}
