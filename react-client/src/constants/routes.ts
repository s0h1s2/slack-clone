declare function ParamType<T extends Record<string, unknown>>(): T
type Route = {
  [key: string]: {
    url: string
    params?: Record<string, unknown>
  }
}
const routes = {
  login: {
    url: "/login",
  },
  signup: {
    url: "/signup"
  },
  workspace: {
    url: "/workspaces/:id",
    params: ParamType<{ id: number }>()
  }
} as const satisfies Route;
export type NamedRoutes = keyof typeof routes

const navigateTo = (route: NamedRoutes, params: Record<string, unknown>) => {
}
