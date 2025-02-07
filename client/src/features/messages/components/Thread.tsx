import { ChannelMessageResponse } from "@/api";
import { apiClient } from "@/api/client";
import Editor from "@/components/Editor";
import PageLoading from "@/components/PageLoading";
import { Button } from "@/components/ui/button";
import { useCreateChannelMessage } from "@/features/channel/channel-service";
import { useRealtimeConnection } from "@/hooks/use-websocket";
import { useQuery } from "@tanstack/react-query";
import { XIcon } from "lucide-react";
import { useEffect, useState } from "react";
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
  const [replies, setReplies] = useState<Array<ChannelMessageResponse>>();
  useEffect(() => {
    if (data?.messages) {
      setReplies(() => [...data.messages]);
    }
  }, [data]);
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
      console.log();
      setReplies((prev) => [...prev, message]);
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
        <div className="flex flex-col">
          {JSON.stringify(replies)}
          <div className="px-4 self-end">
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
