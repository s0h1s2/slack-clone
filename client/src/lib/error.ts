
export class ApiValidationError {
  readonly errors: Record<string, string>
  constructor(errors: Record<string, string>) {
    this.errors = errors
  }
}
