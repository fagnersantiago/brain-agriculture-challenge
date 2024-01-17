import { AppError } from './AppError';

export class InvalidCpfCnpjError extends AppError {
  constructor() {
    super('Inválid CPF OR CNPJ', 400);
  }
}
