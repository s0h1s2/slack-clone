export class ApiValidationErrors extends Error {
  errors: Record<string, string[] | string>;
  constructor(errors: Record<string, string[] | string>, message: string) {
    super(message);
    this.name = "ApiValidationErrors";
    this.errors = errors;
  }
}
export class NetworkError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NetworkError";
  }
}
