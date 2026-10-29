import { CatalogDirection, Prisma } from '@prisma/client';
import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../db.js';
import { asyncHandler } from '../middleware/async-handler.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';
import { HttpError } from '../middleware/errors.js';

export const catalogRouter = Router();

const catalogItemSchema = z.object({
  category: z.string().trim().min(1).max(80),
  direction: z.enum(['INGRESOS', 'EGRESOS']),
  code: z.string().trim().min(1).max(40),
  title: z.string().trim().min(1).max(250),
  description: z.string().trim().min(1).max(10000),
  note: z.string().trim().max(10000).nullable().optional(),
  active: z.boolean().optional(),
});

const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(10),
  category: z.string().trim().min(1).optional(),
  direction: z.enum(['INGRESOS', 'EGRESOS']).optional(),
  search: z.string().trim().max(200).optional(),
});

catalogRouter.get('/', asyncHandler(async (request, response) => {
  const query = paginationSchema.parse(request.query);
  const where: Prisma.CatalogItemWhereInput = {
    active: true,
    ...(query.category ? { category: query.category } : {}),
    ...(query.direction ? { direction: query.direction } : {}),
    ...(query.search
      ? {
          OR: [
            { code: { contains: query.search, mode: 'insensitive' } },
            { title: { contains: query.search, mode: 'insensitive' } },
            { description: { contains: query.search, mode: 'insensitive' } },
          ],
        }
      : {}),
  };
  const [total, items] = await prisma.$transaction([
    prisma.catalogItem.count({ where }),
    prisma.catalogItem.findMany({
      where,
      orderBy: [{ category: 'asc' }, { code: 'asc' }],
      skip: (query.page - 1) * query.pageSize,
      take: query.pageSize,
    }),
  ]);

  response.json({
    pagination: {
      page: query.page,
      pageSize: query.pageSize,
      total,
      totalPages: Math.ceil(total / query.pageSize),
    },
    data: items,
  });
}));

catalogRouter.get('/:id', asyncHandler(async (request, response) => {
  const id = z.string().parse(request.params.id);
  const item = await prisma.catalogItem.findFirst({
    where: { id, active: true },
  });
  if (!item) throw new HttpError(404, 'NOT_FOUND', 'El numeral no existe.');
  response.json({ data: item });
}));

catalogRouter.post('/', authenticate, requireAdmin, asyncHandler(async (request, response) => {
  const input = catalogItemSchema.parse(request.body);
  const item = await prisma.catalogItem.create({
    data: { ...input, direction: input.direction as CatalogDirection },
  });
  response.status(201).json({ data: item });
}));

catalogRouter.put('/:id', authenticate, requireAdmin, asyncHandler(async (request, response) => {
  const id = z.string().parse(request.params.id);
  const input = catalogItemSchema.partial().refine((value) => Object.keys(value).length > 0, {
    message: 'Envía por lo menos un campo para actualizar.',
  }).parse(request.body);
  const item = await prisma.catalogItem.update({
    where: { id },
    data: input,
  });
  response.json({ data: item });
}));

catalogRouter.delete('/:id', authenticate, requireAdmin, asyncHandler(async (request, response) => {
  const id = z.string().parse(request.params.id);
  await prisma.catalogItem.update({ where: { id }, data: { active: false } });
  response.status(204).end();
}));
