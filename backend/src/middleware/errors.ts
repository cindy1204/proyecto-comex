import type { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { Prisma } from '@prisma/client';
import { ZodError } from 'zod';

export class HttpError extends Error {
  constructor(
    public readonly status: number,
    public readonly code: string,
    message: string,
  ) {
    super(message);
    this.name = 'HttpError';
  }
}

export function notFound(_request: Request, _response: Response, next: NextFunction) {
  next(new HttpError(404, 'NOT_FOUND', 'La ruta solicitada no existe.'));
}

export const errorHandler: ErrorRequestHandler = (error: unknown, _request, response, _next) => {
  if (error instanceof HttpError) {
    response.status(error.status).json({ error: { code: error.code, message: error.message } });
    return;
  }

  if (error instanceof ZodError) {
    response.status(400).json({
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Revisa los datos enviados.',
        details: error.issues.map((issue) => ({ field: issue.path.join('.'), message: issue.message })),
      },
    });
    return;
  }

  if (
    error instanceof SyntaxError
    && typeof error === 'object'
    && error !== null
    && 'type' in error
    && error.type === 'entity.parse.failed'
  ) {
    response.status(400).json({ error: { code: 'INVALID_JSON', message: 'El cuerpo de la petición no contiene JSON válido.' } });
    return;
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      response.status(409).json({ error: { code: 'CONFLICT', message: 'Ya existe un registro con esos datos.' } });
      return;
    }
    if (error.code === 'P2025') {
      response.status(404).json({ error: { code: 'NOT_FOUND', message: 'El registro solicitado no existe.' } });
      return;
    }
  }

  console.error('Error no controlado en la API:', error);
  response.status(500).json({ error: { code: 'INTERNAL_ERROR', message: 'Ocurrió un error interno.' } });
};
