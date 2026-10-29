import type { NextFunction, Request, Response } from 'express';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import { UserRole } from '@prisma/client';
import { config } from '../config.js';
import { prisma } from '../db.js';
import { HttpError } from './errors.js';

export async function authenticate(request: Request, _response: Response, next: NextFunction) {
  const authorization = request.header('authorization');
  const token = authorization?.match(/^Bearer\s+(.+)$/i)?.[1];

  if (!token) {
    return next(new HttpError(401, 'UNAUTHORIZED', 'Debes iniciar sesión para realizar esta acción.'));
  }

  try {
    const payload = jwt.verify(token, config.jwtSecret);
    if (typeof payload === 'string' || !payload.sub || !isUserRole(payload.role)) {
      throw new HttpError(401, 'INVALID_TOKEN', 'El token no es válido.');
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.sub },
      select: { id: true, role: true },
    });

    if (!user) {
      throw new HttpError(401, 'INVALID_TOKEN', 'La sesión ya no está disponible.');
    }

    request.auth = { userId: user.id, role: user.role };
    next();
  } catch (error) {
    if (error instanceof HttpError) return next(error);
    if (error instanceof jwt.JsonWebTokenError || error instanceof jwt.TokenExpiredError) {
      return next(new HttpError(401, 'INVALID_TOKEN', 'El token es inválido o expiró.'));
    }
    next(error);
  }
}

export function requireAdmin(request: Request, _response: Response, next: NextFunction) {
  if (request.auth?.role !== UserRole.ADMIN) {
    return next(new HttpError(403, 'FORBIDDEN', 'No tienes permiso para realizar esta acción.'));
  }
  next();
}

function isUserRole(role: JwtPayload['role']): boolean {
  return role === UserRole.ADMIN.toLowerCase() || role === UserRole.USER.toLowerCase();
}
