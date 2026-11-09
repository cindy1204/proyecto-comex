import type { CatalogRepository } from '../domain/catalog.js';
import type { InteractionRepository } from '../domain/interactions.js';
import { ApplicationError } from '../domain/errors.js';

const interactionNumerals = {
  'formulario-importaciones': { category: 'importaciones', field: 'numeralOperacion' },
  'formulario-exportaciones': { category: 'exportaciones', field: 'numeralCambiario' },
} as const;

export type InteractionType = keyof typeof interactionNumerals;

export class InteractionService {
  constructor(
    private readonly catalog: CatalogRepository,
    private readonly interactions: InteractionRepository,
  ) {}

  async create(userId: string, type: InteractionType, data: Record<string, unknown>) {
    const selection = interactionNumerals[type];
    const code = data[selection.field];
    if (typeof code !== 'string' || !code.trim()) {
      throw new ApplicationError(400, 'VALIDATION_ERROR', 'Selecciona un numeral cambiario válido.');
    }

    const item = await this.catalog.findActiveByCategoryAndCode(selection.category, code);
    if (!item) {
      throw new ApplicationError(400, 'VALIDATION_ERROR', 'El numeral no pertenece al catálogo activo.');
    }

    const operationDate = parseOperationDate(data.fechaTramite);
    const totalUsd = parseTotalUsd(data.valorTotalDolares);
    return this.interactions.create({
      userId,
      catalogItemId: item.id,
      type,
      data,
      operationDate,
      totalUsd,
    });
  }

  findMine(userId: string) {
    return this.interactions.findByUser(userId);
  }

  findAll() {
    return this.interactions.findAll();
  }
}

function parseOperationDate(value: unknown): Date {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    throw new ApplicationError(400, 'VALIDATION_ERROR', 'La fecha del trámite debe ser válida.');
  }
  const date = new Date(`${value}T00:00:00.000Z`);
  if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== value) {
    throw new ApplicationError(400, 'VALIDATION_ERROR', 'La fecha del trámite debe ser válida.');
  }
  return date;
}

function parseTotalUsd(value: unknown): string {
  const amount = typeof value === 'string'
    ? value
    : typeof value === 'number' && Number.isFinite(value)
      ? value.toString()
      : null;
  if (amount === null || !/^\d{1,18}(?:\.\d{1,2})?$/.test(amount)) {
    throw new ApplicationError(400, 'VALIDATION_ERROR', 'El valor total en dólares debe ser un monto válido con máximo dos decimales.');
  }
  return amount;
}
