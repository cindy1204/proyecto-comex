export type ContactProduct = 'importaciones' | 'exportaciones' | 'deudaExterna' | 'inversiones' | 'servicios';

export interface ContactRequestInput {
  nombreCompleto: string;
  email: string;
  empresa: string;
  telefono: string;
  tipoProducto: ContactProduct;
  descripcionCaso: string;
}

export interface ContactRepository {
  create(input: ContactRequestInput): Promise<{ id: string; createdAt: Date }>;
}
