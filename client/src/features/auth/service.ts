import { apiClient } from "@/lib/api";
import { ApiValidationErrors, HttpError } from "@/lib/error";
import { AxiosError } from "axios";
import { Either, right, left } from "fp-ts/lib/Either";

export const createUser = async (email: string, password: string): Promise<Either<ApiValidationErrors | HttpError, string>> => {
  const res = await apiClient.post("/users", {
    email: email,
    password: password
  })

  if (res.status === 422) {
    return left({ _type: "ApiValidationErrors", errors: e.response?.data.errors })
    return left({ _type: "HttpError", errors: res.data })

  }
}
