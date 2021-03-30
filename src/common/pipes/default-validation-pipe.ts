import { BadRequestException, ValidationPipeOptions } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { uppercaseFirst } from '../helpers';

export const defaultExceptionFactory = (errors: ValidationError[]) => {
  throw new BadRequestException(
    errors
      .map(error =>
        Object.entries(error.constraints)
          .map(constraint => uppercaseFirst(constraint[1]))
          .join(`, `),
      )
      .join('\n'),
  );
};

export const defaultValidationPipeOption: ValidationPipeOptions = {
  forbidUnknownValues: true,
  forbidNonWhitelisted: true,
  exceptionFactory: defaultExceptionFactory,
};
