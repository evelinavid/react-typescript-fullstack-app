import NotFoundError from 'errors/not-found-error';

class ServiceNotFound extends NotFoundError {
  constructor(id: string | number) {
    super(`Service with id '${id}' was not found`);
  }
}

export default ServiceNotFound;
