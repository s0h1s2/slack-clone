import { object, string, InferType, ref as yupRef } from "yup";
export const LoginValidationSchema = object({
  email: string().email().required(),
  password: string().required(),
});
export const SignupValidationSchema = object({
  name: string().required(),
  email: string().email().required(),
  password: string().min(8).required(),
  confirmPassword: string().oneOf([yupRef("password")], "Passwords must match").required("Confirm Password is required")
});
export type LoginFormT = InferType<typeof LoginValidationSchema>
export type SignupFormT = InferType<typeof SignupValidationSchema>
