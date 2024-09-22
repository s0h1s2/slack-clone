import { apiClient } from "@/lib/api";
import { ApiValidationError } from "@/lib/error";
import { Either, right, left } from "fp-ts/lib/Either";

export const createUser = async (email: string, password: string): Promise<Either<ApiValidationError, string>> => {
  const res = await apiClient.post("/users", {
    email: email,
    password: password
  });

  return right("User created");
}
