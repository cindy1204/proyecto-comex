import { Router } from 'express';
import { z } from 'zod';
import type { AuthService } from '../../../application/auth-service.js';
import { asyncHandler } from '../middleware/async-handler.js';
import { HttpError } from '../middleware/errors.js';
import { createAuthenticate } from '../middleware/auth.js';

const credentialsSchema = z.object({
  name: z.string().trim().min(2).max(120).optional(),
  email: z.string().trim().email().max(254).transform((email) => email.toLowerCase()),
  password: z.string().min(8).max(128),
});

export function createAuthRouter(authService: AuthService) {
  const router = Router();
  const authenticate = createAuthenticate(authService);

  router.post('/register', asyncHandler(async (request, response) => {
    const input = credentialsSchema.parse(request.body);
    if (!input.name) {
      throw new HttpError(400, 'VALIDATION_ERROR', 'El nombre es obligatorio para registrarse.');
    }
    const user = await authService.register({
      name: input.name,
      email: input.email,
      password: input.password,
    });
    response.status(201).json({ data: user });
  }));

  router.post('/login', asyncHandler(async (request, response) => {
    const input = credentialsSchema.omit({ name: true }).parse(request.body);
    response.json({ data: await authService.login(input) });
  }));

  router.get('/me', authenticate, asyncHandler(async (request, response) => {
    response.json({ data: await authService.getCurrentUser(request.auth!.userId) });
  }));

  return router;
}
