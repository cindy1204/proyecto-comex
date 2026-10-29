import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { config } from '../config.js';
import { prisma } from '../db.js';
import { asyncHandler } from '../middleware/async-handler.js';
import { HttpError } from '../middleware/errors.js';
import { authenticate } from '../middleware/auth.js';

export const authRouter = Router();

const credentialsSchema = z.object({
  name: z.string().trim().min(2).max(120).optional(),
  email: z.string().trim().email().max(254).transform((email) => email.toLowerCase()),
  password: z.string().min(8).max(128),
});

authRouter.post('/register', asyncHandler(async (request, response) => {
  const input = credentialsSchema.parse(request.body);
  if (!input.name) {
    throw new HttpError(400, 'VALIDATION_ERROR', 'El nombre es obligatorio para registrarse.');
  }

  const passwordHash = await bcrypt.hash(input.password, 12);
  const user = await prisma.user.create({
    data: { name: input.name, email: input.email, passwordHash },
    select: { id: true, name: true, email: true, role: true, createdAt: true },
  });

  response.status(201).json({ data: { ...user, role: user.role.toLowerCase() } });
}));

authRouter.post('/login', asyncHandler(async (request, response) => {
  const input = credentialsSchema.omit({ name: true }).parse(request.body);
  const user = await prisma.user.findUnique({ where: { email: input.email } });
  const passwordMatches = user ? await bcrypt.compare(input.password, user.passwordHash) : false;

  if (!user || !passwordMatches) {
    throw new HttpError(401, 'INVALID_CREDENTIALS', 'Correo o contraseña incorrectos.');
  }

  const token = jwt.sign(
    { role: user.role.toLowerCase() },
    config.jwtSecret,
    { subject: user.id, expiresIn: config.jwtExpiresInSeconds },
  );

  response.json({
    data: {
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role.toLowerCase() },
    },
  });
}));

authRouter.get('/me', authenticate, asyncHandler(async (request, response) => {
  const user = await prisma.user.findUnique({
    where: { id: request.auth!.userId },
    select: { id: true, name: true, email: true, role: true, createdAt: true },
  });
  if (!user) throw new HttpError(404, 'NOT_FOUND', 'El usuario no existe.');
  response.json({ data: { ...user, role: user.role.toLowerCase() } });
}));
