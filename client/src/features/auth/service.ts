import { apiClient } from "@/lib/api";
import { ApiValidationErrors, HttpError, UnauthorizedError } from "@/lib/error";
import { Either, right, left } from "fp-ts/lib/Either";
import { UserToken } from "./types";

export const createUser = async (name: string, email: string, password: string): Promise<Either<ApiValidationErrors | HttpError, string>> => {
  const res = await apiClient.post("/users", {
    name: name,
    email: email,
    password: password
  })
  if (res.status === 201) {
    return right("User Created Successfully");
  } else if (res.status === 422) {
    return left({ _type: "ApiValidationErrors", errors: res.data.errors })
  }
  return left({ _type: "HttpError", errors: res.data.errors })
}
export const loginUser = async (email: string, password: string): Promise<Either<UnauthorizedError | HttpError, UserToken>> => {
  const res = await apiClient.post("/users/login", {
    email: email,
    password: password
  });
  if (res.status === 200) {
    return right({ accessToken: res.data.accessToken })
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
