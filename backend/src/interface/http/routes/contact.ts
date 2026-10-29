import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { z } from 'zod';
import type { ContactService } from '../../../application/contact-service.js';
import { asyncHandler } from '../middleware/async-handler.js';

const contactRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
});

const contactSchema = z.object({
  nombreCompleto: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254).transform((email) => email.toLowerCase()),
  empresa: z.string().trim().max(160).optional().default(''),
  telefono: z.string().trim().max(40).optional().default(''),
  tipoProducto: z.enum(['importaciones', 'exportaciones', 'deudaExterna', 'inversiones', 'servicios']),
  descripcionCaso: z.string().trim().min(1).max(2000),
}).strict();

export function createContactRouter(contactService: ContactService) {
  const router = Router();
  router.post('/', contactRateLimit, asyncHandler(async (request, response) => {
    const input = contactSchema.parse(request.body);
    response.status(201).json({ data: await contactService.create(input) });
  }));
  return router;
}
