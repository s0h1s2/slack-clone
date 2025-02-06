import { apiClient } from "@/api/client";
import PageLoading from "@/components/PageLoading";
import { Button } from "@/components/ui/button";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { XIcon } from "lucide-react";
type Props = {
  messageId: number;
  workspaceId: number;
  onClose: () => void;
};

const Thread = ({ messageId, onClose, workspaceId }: Props) => {
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
      {isLoading ? <PageLoading /> : <div>{JSON.stringify(data)}</div>}
    </div>
  );
};

export default Thread;
