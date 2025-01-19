import { GetChannelMessagesResponse } from "@/api";
import { differenceInMinutes, format, isToday, isYesterday } from "date-fns";
import Message from "./Message";

type Props = {
  data: GetChannelMessagesResponse;
  variant?: "channel" | "thread" | "conversation";
};
const TIME_THRESHOLD = 5; // Define the time threshold in minutes

const formatDateLabel = (dateStr: string) => {
  const date = new Date(dateStr);
  if (isToday(date)) return "Today";
  if (isYesterday(date)) return "Yesterday";
  return format(date, "EEEE,MMMM d");
};
const MessagesList = ({ data, variant }: Props) => {
  const groupedMessages: Record<string, typeof data> = data?.messages?.reduce(
    (groups, message) => {
      const msgDate = new Date(message.createdAt);
      const dateKey = format(msgDate, "yyyy-MM-dd");
      if (!groups[dateKey]) {
        groups[dateKey] = { messages: [] };
      }
      groups[dateKey].messages.unshift(message);
      return groups;
    },
    {} as Record<string, typeof data>
  );
  return (
    <div className="flex-1 flex flex-col-reverse pb-4 overflow-y-auto messages-scrollbar">
      {Object.entries(groupedMessages).map(([dateKey, messages]) => {
        return (
          <div key={dateKey}>
            <div className="text-center my-2 relative">
              <hr className="absolute top-1/2 left-0 right-0 border-t border-gray-300" />
              <span className="relative inline-block bg-white px-4 py-1 rounded-full text-xs border border-gray-300 shadow-sm ">
                {formatDateLabel(dateKey)}
              </span>
            </div>
            {messages.messages.map((message) => {
              const prevMessage =
                messages.messages[messages.messages.indexOf(message) - 1];
              // TODO: change username to user id
              const isCompact =
                prevMessage &&
                prevMessage.username === message.username &&
                differenceInMinutes(
                  new Date(message.createdAt),
                  new Date(prevMessage.createdAt)
                ) < TIME_THRESHOLD;
              return (
                <Message
                  id={message.id}
                  authorImage={message?.avatar ?? undefined}
                  authorName={message.username}
                  isCompact={isCompact}
                  memberId="string"
                  isAuthor={false}
                  body={message.message}
                  image={message.username}
                  createdAt={message.createdAt.toDateString()}
                  updatedAt={message.createdAt.toDateString()}
                  isEditing={false}
                  setEditingId={function (id: string | null): void {
                    throw new Error("Function not implemented.");
                  }}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default MessagesList;
