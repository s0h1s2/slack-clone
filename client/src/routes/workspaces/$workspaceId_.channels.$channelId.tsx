import MessagesList from "@/components/MessageList";
import { useGetChannelMessages } from "@/features/channel/channel-service";
import ChannelHeader from "@/features/channel/components/ChannelHeader";
import ChatInput from "@/features/channel/components/ChatInput";
import WorkspaceLayout from "@/features/workspace/components/Layout";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChannelMessageResponse } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/api/client";
import { NetworkError } from "@/lib/errors";
import PageLoading from "@/components/PageLoading";
import { useRealtimeConnection } from "@/hooks/use-websocket";

export const Route = createFileRoute(
  "/workspaces/$workspaceId_/channels/$channelId"
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { workspaceId, channelId } = Route.useParams();
  const {
    messages: loadedMessages,
    isMessagesLoading,
    isLoadingMore,
    loadNextPage,
    canLoadMore,
  } = useGetChannelMessages(Number(channelId));
  const {
    data: channelInfo,
    isLoading: isChannelLoading,
    error,
  } = useQuery({
    queryKey: ["channel", channelId],
    queryFn: async () => {
      try {
        return apiClient.channelsApi.apiChannelIdGet({
          id: Number(channelId),
        });
      } catch (error: Error | unknown) {
        if (error instanceof Error) {
          throw new NetworkError(error?.message);
        }
      }
    },
  });
  const [messages, setMessages] = useState<Array<ChannelMessageResponse>>([]);

  useEffect(() => {
    if (isChannelLoading) return;
    setMessages(() => [...channelInfo!.messages]);
  }, [channelInfo, isChannelLoading]);
  useEffect(() => {
    if (!loadedMessages) return;
    setMessages(() => [...loadedMessages?.pages.flatMap((p) => p!.messages)]);
  }, [loadedMessages]);

  const conn = useRealtimeConnection();
  useEffect(() => {
    if (conn) {
      conn?.on("ReceiveMessage", (message: ChannelMessageResponse) => {
        setMessages((prev) => [message, ...prev]);
      });
      conn?.on(
        "UpdateMessage",
        (messageId: number, newBody: string, updateTime: Date) => {
          setMessages((prev) => {
            let newMessages = [...prev];
            let newMessage = newMessages.find((msg) => msg.id == messageId);
            newMessage!.message = newBody;
            newMessage!.updateAt = updateTime.toString();
            return newMessages;
          });
        }
      );
      conn?.on("DeleteMessage", (id) => {
        setMessages((prev) => prev.filter((chat) => chat.id !== id));
      });
    }
    return () => {
      conn.off("ReceiveMessage");
      conn.off("UpdateMessage");
      conn.off("DeleteMessage");
    };
  }, []);

  useEffect(() => {
    const connectToChannel = async () => {
      try {
        await conn?.invoke("JoinChannel", parseInt(channelId));
        console.info("Connected to channel");
      } catch (e: Error | unknown) {
        console.error("Error: error while joining channel", e);
      }
    };
    connectToChannel();
  }, [channelId]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <WorkspaceLayout workspaceId={Number(workspaceId)}>
      <div className="flex flex-col h-full">
        {isMessagesLoading || isChannelLoading ? (
          <PageLoading />
        ) : (
          <>
            <ChannelHeader title={channelInfo!.name} />
            <MessagesList
              variant="channel"
              messages={messages}
              channelName={channelInfo?.name}
              channelId={channelInfo?.id}
              loadMore={loadNextPage}
              canLoadMore={canLoadMore}
              isLoadingMore={isLoadingMore}
              channelCreationDate={channelInfo?.createdAt}
            />
            <ChatInput />
          </>
        )}
      </div>
    </WorkspaceLayout>
  );
}
