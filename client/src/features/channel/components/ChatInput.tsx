import { ResponseError } from "@/api";
import { apiClient } from "@/api/client";
import Editor, { ChatMessage } from "@/components/Editor";
import { useParams } from "@tanstack/react-router";
import { useState } from "react";
import { useCreateChannelMessage } from "../channel-service";

const ChatInput = () => {
  const { createMessage, isCreating, key } = useCreateChannelMessage();

  return (
    <div className="px-5 w-full" key={key}>
      <Editor
        onSubmit={createMessage}
        placeHolder="Say something..."
        disabled={isCreating}
      />
    </div>
  );
};

export default ChatInput;
