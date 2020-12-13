class CustomError extends Error {
  status: number;
  // message: string;
  constructor(message: string, status: number = 500) {
    super();

    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = message || 'Something went wrong. Please try again.';
    this.status = status;
  }
}

export default CustomError;
