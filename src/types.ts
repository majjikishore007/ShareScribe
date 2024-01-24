export class CustomResponse<T> {
  data: T | null;
  error: CustomError | null;

  constructor(data: T | null, error: CustomError | null) {
    this.data = data;
    this.error = error;
  }
}

export class CustomError {
  status: number;
  message: string;

  constructor(message: string, status: number) {
    this.status = status;
    this.message = message;
  }
}
