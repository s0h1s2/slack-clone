import Editor from "@/components/Editor";
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
