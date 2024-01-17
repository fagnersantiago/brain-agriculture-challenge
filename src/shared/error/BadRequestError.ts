import { AppError } from './AppError';

export class BadRequestError extends AppError {
  constructor() {
    super(
      'The sum Agricultural Area and vegetation cannot be greater than total area of the farm',
      400,
    );
  }
}
