// declare function ParamType<T extends Record<string, unknown>>(): T

type Route = {
  [key: string]: {
    url: string
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
  }
} as const satisfies Route;
export type NamedRoutes = keyof typeof routes
export const getRouteUrl = (route: NamedRoutes) => {
  return routes[route].url
}

