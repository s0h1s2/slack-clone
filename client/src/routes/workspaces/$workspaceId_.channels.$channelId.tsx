import ChannelHeader from '@/features/channel/components/ChannelHeader'
import WorkspaceLayout from '@/features/workspace/components/Layout'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/workspaces/$workspaceId_/channels/$channelId',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const { workspaceId } = Route.useParams()
  return (
    <WorkspaceLayout workspaceId={Number(workspaceId)}>
      <div className="flex flex-col min-h-screen">
        <ChannelHeader title="My Channel"></ChannelHeader>
      </div>
    </WorkspaceLayout>)
}
