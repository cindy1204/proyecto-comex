import type { NextFunction, Request, Response } from 'express';
import type { AuthService } from '../../../application/auth-service.js';
import { HttpError } from './errors.js';

export function createAuthenticate(authService: AuthService) {
  return async (request: Request, _response: Response, next: NextFunction) => {
    const token = request.header('authorization')?.match(/^Bearer\s+(.+)$/i)?.[1];
    if (!token) {
      return next(new HttpError(401, 'UNAUTHORIZED', 'Debes iniciar sesión para realizar esta acción.'));
    }

    try {
      const identity = authService.authenticate(token);
      request.auth = { userId: identity.id, role: identity.role };
      next();
    } catch (error) {
      next(error);
    }
  };
}

export function requireAdmin(request: Request, _response: Response, next: NextFunction) {
  if (request.auth?.role !== 'admin') {
    return next(new HttpError(403, 'FORBIDDEN', 'No tienes permiso para realizar esta acción.'));
  }
  next();
}
