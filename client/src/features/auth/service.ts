import { apiClient } from "@/lib/api";
import { ApiValidationErrors, HttpError, UnauthorizedError } from "@/lib/error";
import { AxiosError } from "axios";
import { Either, right, left } from "fp-ts/lib/Either";

export const createUser = async (email: string, password: string): Promise<Either<ApiValidationErrors | HttpError, string>> => {
  const res = await apiClient.post("/users", {
    email: email,
    password: password
  })
  if (res.status === 201) {
    return right("User Created Successfully");
    return left({ _type: "HttpError", errors: res.data })
  } else if (res.status === 422) {
    return left({ _type: "ApiValidationErrors", errors: res.data.errors })
  }
  return left({ _type: "HttpError", errors: res.data.errors })
}
export const loginUser = async (username: string, password: string): Promise<Either<UnauthorizedError | HttpError, string>> => {
  const res = await apiClient.post("/users/login", {
    username: username,
    password: password
  });
  if (res.status === 200) {
    return right("token");
  }
  if (res.status === 401) {
    return left({
      _type: "UnauthorizedError",
    })
  }
  return left({
    _type: "HttpError",
    errors: res.data
  });
}
