import { Response } from 'express';
import { ValidationError } from 'yup';
import NotFoundError from '../errors/not-found-error';
import UnauthorizedError from '../errors/unauthorized-error';
import ForbiddenError from '../errors/forbidden-error';
import recursiveValidationErrorReducer from './recursive-validation-error-reducer';

const handleRequestError = (err:unknown, res: Response<ErrorResponse>):void => {
  let status = 400;
  const errorResponse: ErrorResponse = {
    error: 'Request error',
  };

  if (err instanceof Error) errorResponse.error = err.message;
  if (err instanceof NotFoundError) status = 404;
  if (err instanceof UnauthorizedError) status = 401;
  if (err instanceof ForbiddenError) status = 401;
  if (err instanceof ValidationError && err.errors.length > 0) {
    errorResponse.errors = err.inner.reduce(recursiveValidationErrorReducer, {});
  }
  console.log('--------------------------');
  console.log(errorResponse.error);
  console.log('--------------------------');

  res.status(status).json(errorResponse);
};

export default handleRequestError;
