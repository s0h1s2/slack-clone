export type ApiValidationErrors = {
  _type: "ApiValidationErrors",
  errors: Record<string, string>
}
export type HttpError = {
  _type: "HttpError",
  errors: any
}

