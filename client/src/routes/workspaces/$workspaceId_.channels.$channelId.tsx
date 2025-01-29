import MessagesList from "@/components/MessageList";
import { useGetChannelMessages } from "@/features/channel/channel-service";
import ChannelHeader from "@/features/channel/components/ChannelHeader";
import ChatInput from "@/features/channel/components/ChatInput";
import WorkspaceLayout from "@/features/workspace/components/Layout";
import { createFileRoute } from "@tanstack/react-router";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { useEffect, useState } from "react";
import { ChannelMessageResponse } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/api/client";
import { NetworkError } from "@/lib/errors";

export const Route = createFileRoute(
  "/workspaces/$workspaceId_/channels/$channelId"
)({
  component: RouteComponent,
});

function RouteComponent() {
  const [connection, setConnetion] = useState<HubConnection | null>(null);
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
  useEffect(() => {
    const conn = new HubConnectionBuilder()
      .withUrl("http://localhost:8000/channels", { withCredentials: false })
      .withAutomaticReconnect()
      .build();
    setConnetion(conn);
  }, []);
  useEffect(() => {
    connection
      ?.start()
      .then(async () => {
        try {
          await connection?.invoke("JoinChannel", parseInt(channelId));
          console.info("Connected to channel");
        } catch (e: Error | unknown) {
          console.error("Error: error while joining channel", e);
        }
      })
      .catch((err) => console.error(err));
    connection?.on("ReceiveMessage", (message: ChannelMessageResponse) => {
      setMessages((prev) => [message, ...prev]);
    });
  }, [connection]);
  useEffect(() => {
    const connectToChannel = async () => {
      try {
        await connection?.invoke("JoinChannel", parseInt(channelId));
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
          <div>Loading...</div>
        ) : (
          <>
            <ChannelHeader title={channelInfo!.name} />
            <MessagesList
              variant="channel"
              messages={messages}
              channelName="Oh life is bigger"
              loadMore={loadNextPage}
              canLoadMore={canLoadMore}
              isLoadingMore={isLoadingMore}
              channelCreationDate={new Date().toISOString()}
            />
            <ChatInput />
          </>
        )}
      </div>
    </WorkspaceLayout>
  );
}
