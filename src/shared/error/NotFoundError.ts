import { AppError } from './AppError';

export class NotFoundError extends AppError {
  constructor() {
    super('Producer Found', 404);
  }
}
