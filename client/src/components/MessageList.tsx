import { ChannelMessageResponse } from "@/api";
import { differenceInMinutes, format, isToday, isYesterday } from "date-fns";
import Message from "./Message";
import ChannelHero from "@/features/channel/components/ChannelHero";
import { useInView } from "react-intersection-observer";

import { Loader } from "lucide-react";
import { useEffect } from "react";

type Props = {
  messages: Array<ChannelMessageResponse>;
  variant?: "channel" | "thread" | "conversation";
  loadMore: () => void;
  isLoadingMore: boolean;
  canLoadMore: boolean;

  channelName?: string;
  channelCreationDate?: string;
};
const TIME_THRESHOLD = 5; // Define the time threshold in minutes

const formatDateLabel = (dateStr: string) => {
  const date = new Date(dateStr);
  if (isToday(date)) return "Today";
  if (isYesterday(date)) return "Yesterday";
  return format(date, "EEEE,MMMM d");
};
type LoadMoreMessagesProps = {
  canLoadMore: boolean;
  loadMore: () => void;
  isLoadingMore: boolean;
};
const LoadMoreMessages = ({
  canLoadMore,
  loadMore,
  isLoadingMore,
}: LoadMoreMessagesProps) => {
  const { ref, inView } = useInView({
    threshold: 1,
  });
  useEffect(() => {
    if (inView && canLoadMore) {
      loadMore();
    }
  }, [loadMore, inView, canLoadMore]);
  return (
    <>
      {isLoadingMore && (
        <div className="text-center my-2 relative">
          <hr className="absolute top-1/2 left-0 right-0 border-t border-gray-300" />
          <span className="relative inline-block bg-white px-4 py-1 rounded-full text-xs border border-gray-300 shadow-sm">
            <Loader className="size-4 animate-spin" />
          </span>
        </div>
      )}
      <div ref={ref} />
    </>
  );
};
const MessagesList = ({
  messages,
  variant,
  channelCreationDate,
  channelName,
  canLoadMore,
  isLoadingMore,
  loadMore,
}: Props) => {
  const groupedMessages: Record<string, typeof messages> = messages?.reduce(
    (groups, message) => {
      const msgDate = new Date(message.createdAt);
      const dateKey = format(msgDate, "yyyy-MM-dd");
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].unshift(message);
      return groups;
    },
    {} as Record<string, typeof messages>
  );
  return (
    <div className="flex-1 flex flex-col-reverse pb-4 overflow-y-auto md:[overflow-anchor:none] messages-scrollbar">
      {Object.entries(groupedMessages).map(([dateKey, messages]) => {
        return (
          <div key={dateKey} className="border border-blue-200">
            <div className="text-center my-2 relative">
              <hr className="absolute top-1/2 left-0 right-0 border-t border-gray-300" />
              <span className="relative inline-block bg-white px-4 py-1 rounded-full text-xs border border-gray-300 shadow-sm ">
                {formatDateLabel(dateKey)}
              </span>
            </div>
            {messages.map((message) => {
              const prevMessage = messages[messages.indexOf(message) - 1];
              const isCompact =
                prevMessage &&
                prevMessage.senderId === message.senderId &&
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
                  createdAt={message.createdAt}
                  updatedAt={message.updateAt == null ? null : message.updateAt}
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
      <LoadMoreMessages
        canLoadMore={canLoadMore}
        loadMore={loadMore}
        isLoadingMore={isLoadingMore}
      />
      {variant === "channel" && channelName && channelCreationDate && (
        <ChannelHero title={channelName} creationDate={channelCreationDate} />
      )}
    </div>
  );
};

export default MessagesList;
