type ErrorDetail = {
  data?: Record<string, unknown>;
} & {
  [_: string]: unknown;
};

export class AppError extends Error {
  public _statusCode: number;
  public _details: ErrorDetail;

  constructor(message: string, statusCode: number, details: ErrorDetail) {
    super(message);

    this._statusCode = statusCode;
    this._details = details;
  }

  public get statusCode() {
    return this._statusCode;
  }

  public get details(): ErrorDetail {
    return this._details;
  }
}
