import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/workspaces/$workspaceId/channels/$channelId',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/workspaces/channels/$channelId"!</div>
}
