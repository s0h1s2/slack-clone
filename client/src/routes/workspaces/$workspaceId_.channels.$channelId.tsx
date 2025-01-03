import ChannelHeader from '@/features/channel/components/ChannelHeader'
import ChatInput from '@/features/channel/components/ChatInput'
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
      <div className="flex flex-col h-full">
        <ChannelHeader title="My Channel" />
        <div className='flex-1' />
        <ChatInput />
      </div>
    </WorkspaceLayout>)
}
