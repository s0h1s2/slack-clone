import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_workspaces')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_workspaces"!</div>
}
