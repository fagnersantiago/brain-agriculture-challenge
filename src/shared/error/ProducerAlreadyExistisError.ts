import { AppError } from './AppError';

export class AlreadyExistsError extends AppError {
  constructor() {
    super('Producer already exists', 409);
  }
}
