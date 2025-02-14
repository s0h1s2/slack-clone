import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/workspaces/direct-message/$userId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/workspaces/direct-message/$userId"!</div>
}
