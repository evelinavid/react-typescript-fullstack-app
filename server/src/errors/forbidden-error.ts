class ForbiddenError extends Error {
  constructor(message?: string) {
    super(message ?? 'Insufficient privilegies');
  }
}

export default ForbiddenError;
