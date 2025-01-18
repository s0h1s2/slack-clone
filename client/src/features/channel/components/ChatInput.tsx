import { ResponseError } from "@/api";
import { apiClient } from "@/api/client";
import Editor, { ChatMessage } from "@/components/Editor";
import { useParams, useRouter } from "@tanstack/react-router";
import { useState } from "react";

const ChatInput = () => {
  const { channelId } = useParams({
    from: "/workspaces/$workspaceId_/channels/$channelId",
  });
  const [key, setKey] = useState(1);
  const handleSubmit = async ({ text, image }: ChatMessage) => {
    try {
      await apiClient.channelsApi.apiChannelIdChatPostRaw({
        id: Number(channelId),
        chat: text,
        attachment: image ?? undefined,
      });
      setKey((prev) => prev + 1);
    } catch (error: ResponseError | Error | unknown) {
      console.error(error);
    }
  };
  return (
    <div className="px-5 w-full" key={key}>
      <Editor onSubmit={handleSubmit} placeHolder="Say something..." />
    </div>
  );
};

export default ChatInput;
