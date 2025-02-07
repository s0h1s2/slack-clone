import { ChannelMessageResponse } from "@/api";
import { apiClient } from "@/api/client";
import Editor from "@/components/Editor";
import MessagesList from "@/components/MessageList";
import PageLoading from "@/components/PageLoading";
import { Button } from "@/components/ui/button";
import { useCreateChannelMessage } from "@/features/channel/channel-service";
import { useRealtimeConnection } from "@/hooks/use-websocket";
import { useQuery } from "@tanstack/react-query";
import { MessageCircleOff, XIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
type Props = {
  parentMessageId: number;
  workspaceId: number;
  onClose: () => void;
};

const Thread = ({
  parentMessageId: messageId,
  onClose,
  workspaceId,
}: Props) => {
  const { createMessage, isCreating, key } = useCreateChannelMessage();
  const messagesScrollbar = useRef<HTMLDivElement | null>(null);
  const scrollToBottom = () => {
    if (messagesScrollbar.current) {
      messagesScrollbar.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, []);
  const { data, isLoading } = useQuery({
    queryKey: ["thread", messageId],
    queryFn: async () => {
      try {
        return await apiClient.messagesApi.messagesIdThreadWorkspaceIdGet({
          id: messageId,
          workspaceId: workspaceId,
        });
      } catch (error) {
        throw new Error(error);
      }
    },
  });
  const [replies, setReplies] = useState<Array<ChannelMessageResponse>>([]);
  useEffect(() => {
    if (data?.messages) {
      setReplies(() => [...data.messages]);
    }
  }, [data]);
  useEffect(() => {
    // scrollToBottom();
  }, [replies]);
  const connection = useRealtimeConnection();
  useEffect(() => {
    connection
      .invoke("JoinThread", messageId)
      .then(() => {
        console.log("Joined thread!");
      })
      .catch(() => {
        console.log("Unable to connect to thread");
      });
    connection.on("ThreadMessage", (message) => {
      setReplies((prev) => [message, ...prev]);
    });
    return () => {
      connection.off("ThreadMessage");
    };
  }, [messageId]);
  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center px-4 h-[49px] border-b">
        <p className="text-lg font-bold">Thread</p>
        <Button size="iconSm" variant="ghost" onClick={() => onClose()}>
          <XIcon className="size-5 stroke-[1.5]" />
        </Button>
      </div>
      {isLoading ? (
        <PageLoading />
      ) : (
        <div className="flex flex-col justify-end h-full">
          <div className="overflow-y-auto messages-scrollbar">
            {replies.length > 0 ? (
              <>
                {/* <div ref={messagesScrollbar} /> */}
                <MessagesList
                  messages={replies}
                  variant="thread"
                  loadMore={function (): void {
                    throw new Error("Function not implemented.");
                  }}
                  isLoadingMore={false}
                  canLoadMore={false}
                  hideThreadButton={true}
                />
              </>
            ) : (
              <div className="h-full flex flex-col items-center justify-center gap-2">
                <MessageCircleOff className="text-gray-500" />
                <p className="text-sm text-muted-foreground">
                  No replies yet. Be the first to start the conversation!
                </p>
              </div>
            )}
          </div>
          <div className="px-4">
            <Editor
              key={key}
              onSubmit={({ image, text }) =>
                createMessage({ image, text, messageParentId: messageId })
              }
              disabled={isCreating}
              placeHolder="Replay..."
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Thread;
