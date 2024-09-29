interface Route {
  [key: string]: {
    url: string
  }
}

const routes: Route = {
  login: {
    url: "/login"
  }
} as const
export type NamedRoutes = (keyof typeof routes)

export const navigate = (route: NamedRoutes) => {
}

