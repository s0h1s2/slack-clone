import { ResponseError } from "@/api";
import { apiClient } from "@/api/client";
import Editor, { ChatMessage } from "@/components/Editor";
import { useParams, useRouter } from "@tanstack/react-router";

const ChatInput = () => {
  const { channelId } = useParams({
    from: "/workspaces/$workspaceId_/channels/$channelId",
  });
  const handleSubmit = async ({ text, image }: ChatMessage) => {
    try {
      await apiClient.channelsApi.apiChannelIdChatPostRaw({id:channelId,chat:text,attachment:image??null});
    } catch (error: ResponseError | Error | unknown) {
      console.error(error);
    }
  };
  return (
    <div className="px-5 w-full">
      <Editor onSubmit={handleSubmit} placeHolder="Say something..." />
    </div>
  );
};

export default ChatInput;
