export type AuthFlow = "signin" | "signup"
export type AuthFlowProps = {
  setAuthState: (state: AuthFlow) => void;
}
