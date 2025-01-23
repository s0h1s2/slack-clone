import MessagesList from "@/components/MessageList";
import { useGetChannelMessages } from "@/features/channel/channel-service";
import ChannelHeader from "@/features/channel/components/ChannelHeader";
import ChatInput from "@/features/channel/components/ChatInput";
import WorkspaceLayout from "@/features/workspace/components/Layout";
import {
  createFileRoute,
  useElementScrollRestoration,
} from "@tanstack/react-router";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { useEffect, useState } from "react";
import { ChannelMessageResponse } from "@/api";

export const Route = createFileRoute(
  "/workspaces/$workspaceId_/channels/$channelId"
)({
  component: RouteComponent,
});

function RouteComponent() {
  const [connection, setConnetion] = useState<HubConnection | null>(null);
  const { workspaceId, channelId } = Route.useParams();
  const { messages: loadedMessages, isMessagesLoading } = useGetChannelMessages(
    Number(channelId)
  );

  const [messages, setMessages] = useState<Array<ChannelMessageResponse>>([]);
  useEffect(() => {
    if (!loadedMessages) return;
    setMessages((prev) => [...prev, ...loadedMessages?.messages]);
  }, [loadedMessages]);
  useEffect(() => {
    const conn = new HubConnectionBuilder()
      .withUrl("http://localhost:8000/channels", { withCredentials: false })
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

  return (
    <WorkspaceLayout workspaceId={Number(workspaceId)}>
      <div className="flex flex-col h-full">
        {isMessagesLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            <ChannelHeader title="My Channel" />
            <MessagesList messages={messages} />
            <ChatInput />
          </>
        )}
      </div>
    </WorkspaceLayout>
  );
}
