import { Route } from "wouter";
import { getRouteUrl, NamedRoutes } from "../constants/routes";
import { ReactNode } from "react";
type Props = {
  name: NamedRoutes
  page: ReactNode
}
const NamedRoute = ({ name, page }: Props) => {
  return (
    <Route path={getRouteUrl(name)} component={() => page} />
  )
}

export default NamedRoute
