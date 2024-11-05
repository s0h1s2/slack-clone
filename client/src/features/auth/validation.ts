import { InferType, object, string, ref } from "yup";

export const SignInFormSchema = object({
    email: string().email().required(),
    password: string().required(),
});
export const SignUpFormSchema = object({
    email: string().email().required(),
    name: string().required(),
    password: string().required(),
    confirmPassword: string().oneOf([ref("password")], "Passwords must match").required("Confirm password is required"),
});

export type SignInFormSchemaT = InferType<typeof SignInFormSchema>;
export type SignUpFormSchemaT = InferType<typeof SignUpFormSchema>;
