import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../db.js';
import { asyncHandler } from '../middleware/async-handler.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

export const interactionRouter = Router();

interactionRouter.use(authenticate);

interactionRouter.post('/', asyncHandler(async (request, response) => {
  const input = z.object({
    type: z.string().trim().min(1).max(80),
    data: z.record(z.string(), z.json()),
  }).parse(request.body);
  const interaction = await prisma.interaction.create({
    data: {
      userId: request.auth!.userId,
      type: input.type,
      data: input.data,
    },
  });
  response.status(201).json({ data: interaction });
}));

interactionRouter.get('/mias', asyncHandler(async (request, response) => {
  const interactions = await prisma.interaction.findMany({
    where: { userId: request.auth!.userId },
    orderBy: { createdAt: 'desc' },
  });
  response.json({ data: interactions });
}));

interactionRouter.get('/', requireAdmin, asyncHandler(async (_request, response) => {
  const interactions = await prisma.interaction.findMany({
    include: { user: { select: { id: true, name: true, email: true } } },
    orderBy: { createdAt: 'desc' },
  });
  response.json({ data: interactions });
}));
