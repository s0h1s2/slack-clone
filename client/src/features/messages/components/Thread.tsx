import { apiClient } from "@/api/client";
import Editor from "@/components/Editor";
import PageLoading from "@/components/PageLoading";
import { Button } from "@/components/ui/button";
import { useCreateChannelMessage } from "@/features/channel/channel-service";
import { useQuery } from "@tanstack/react-query";
import { XIcon } from "lucide-react";
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
        <div>
          {JSON.stringify(data)}
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
