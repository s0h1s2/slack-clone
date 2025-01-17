import { GetChannelMessagesResponse } from "@/api";

type Props = {
  data: GetChannelMessagesResponse;
  variant?: "channel" | "thread" | "conversation";
};
const MessagesList = ({ data, variant }: Props) => {
  return (
    <div className="flex-1 flex flex-col-reverse pb-4 overflow-y-auto messages-scrollbar">
      {data.messages.map((message) => {
        return <div>{JSON.stringify(message)}</div>;
      })}
    </div>
  );
};

export default MessagesList;
