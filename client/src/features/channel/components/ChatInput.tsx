import { ResponseError } from "@/api";
import { apiClient } from "@/api/client";
import Editor, { ChatMessage } from "@/components/Editor";
import { useParams } from "@tanstack/react-router";
import { useState } from "react";

const ChatInput = () => {
  const { channelId } = useParams({
    from: "/workspaces/$workspaceId_/channels/$channelId",
  });

  const [key, setKey] = useState(1);
  const [disabled, setDisabled] = useState(false);
  const handleSubmit = async ({ text, image }: ChatMessage) => {
    setDisabled(true);

    try {
      await apiClient.channelsApi.apiChannelIdChatPostRaw({
        id: Number(channelId),
        chat: text,
        attachment: image ?? undefined,
      });
      setKey((prev) => prev + 1);
    } catch (error: ResponseError | Error | unknown) {
      console.error(error);
    } finally {
      setDisabled(false);
    }
  };
  return (
    <div className="px-5 w-full" key={key}>
      <Editor
        onSubmit={handleSubmit}
        placeHolder="Say something..."
        disabled={disabled}
      />
    </div>
  );
};

export default ChatInput;
