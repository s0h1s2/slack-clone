import MessagesList from "@/components/MessageList";
import { useGetChannelMessages } from "@/features/channel/channel-service";
import ChannelHeader from "@/features/channel/components/ChannelHeader";
import ChatInput from "@/features/channel/components/ChatInput";
import WorkspaceLayout from "@/features/workspace/components/Layout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/workspaces/$workspaceId_/channels/$channelId"
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { workspaceId, channelId } = Route.useParams();
  const { messages, isMessagesLoading } = useGetChannelMessages(
    Number(channelId)
  );
  return (
    <WorkspaceLayout workspaceId={Number(workspaceId)}>
      <div className="flex flex-col h-full">
        {isMessagesLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            <ChannelHeader title="My Channel" />
            <MessagesList data={messages} />
            <ChatInput />
          </>
        )}
      </div>
    </WorkspaceLayout>
  );
}
