import { format, isToday, isYesterday } from "date-fns";
import Renderer from "./Renderer";
import Hint from "./Hint";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Thumbnail from "./Thumbnail";
import MessageToolbar from "./MessageToolbar";
import { useDeleteMessage } from "@/features/messages/service";
import { cn } from "@/lib/utils";
import React from "react";
import Editor from "./Editor";

type Props = {
  id: number;
  memberId: string;
  authorImage?: string;
  authorName?: string;
  isAuthor: boolean;
  body: string;
  image: string | null | undefined;
  createdAt: string;
  updatedAt?: string | null;
  isEditing: boolean;
  isCompact?: boolean;
  channelId?: number;
  setEditingId: (id: number | null) => void;
  hideThreadButton?: boolean;
  threadCount?: number;
  threadImage?: string;
  threadTimestamp?: string;
};
const formatFullTime = (date: Date) => {
  return `${isToday(date) ? "Today" : isYesterday(date) ? "Yesterday" : format(date, "MMM d,yyyy")} at ${format(date, "hh:mm:ss a")}`;
};

const Message = ({
  id,
  body,
  image,
  createdAt,
  isAuthor,
  isEditing,
  channelId,
  memberId,
  setEditingId,
  updatedAt,
  authorImage,
  authorName,
  hideThreadButton,
  isCompact,
  threadCount,
  threadImage,
  threadTimestamp,
}: Props) => {
  const { deleteMessage, isDeleteMessageLoading } = useDeleteMessage();
  if (isCompact) {
    return (
      <div className="flex flex-col gap-2 p-1.5 px-0.5 hover:bg-gray-100/60 group relative">
        <div className="flex items-start gap-2">
          <Hint label={formatFullTime(new Date(createdAt))}>
            <button className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 w-[40px] leading-[22px] text-center hover:underline">
              {format(new Date(createdAt), "hh:mm")}
            </button>
          </Hint>
          <div className="flex flex-col w-full">
            <Renderer value={body} />
            <Thumbnail url={image} />
            {updatedAt && (
              <span className="text-xs text-muted-foreground">(edited)</span>
            )}
          </div>
        </div>
        {!isEditing && (
          <MessageToolbar
            isAuthor={isAuthor}
            isPending={isDeleteMessageLoading}
            handleEdit={() => {}}
            handleThread={() => {}}
            handleDelete={() => deleteMessage({ messageId: id })}
            hideThreadButton={false}
          />
        )}
      </div>
    );
  }
  return (
    <div
      className={cn(
        "flex flex-col gap-2 p-1.5 px-0.5 hover:bg-gray-100/60 group relative",
        isEditing && "bg-[#f2c74433] hover:bg-[#f2c74433]"
      )}
    >
      <div className="flex items-start gap-2">
        <button>
          <Avatar>
            <AvatarImage src={authorImage}></AvatarImage>
            <AvatarFallback className="rounded-md bg-sky-500 text-white text-xs">
              {authorName?.at(0)?.toUpperCase() || "noname"}
            </AvatarFallback>
          </Avatar>
        </button>
        {isEditing ? (
          <div className="w-full h-full">
            <Editor
              onSubmit={() => {}}
              disabled={false}
              defaultValue={JSON.parse(body)}
              onCancel={() => setEditingId(null)}
              variant="update"
            />
          </div>
        ) : (
          <div className="flex flex-col w-full overflow-hidden">
            <div className="text-sm">
              <button
                className="font-bold text-primary hover:underline"
                onClick={() => {}}
              >
                {authorName}
              </button>
              <span>&nbsp;</span>
              <Hint label={formatFullTime(new Date(createdAt))}>
                <button className="text-xs text-muted-foreground hover:underline">
                  {format(new Date(createdAt), "h:mm a")}
                </button>
              </Hint>
            </div>
            <Renderer value={body} />
            <Thumbnail url={image} />
            {updatedAt !== null && (
              <span className="text-xs text-muted-foreground">(edited)</span>
            )}
          </div>
        )}
      </div>
      {!isEditing && (
        <MessageToolbar
          isAuthor={isAuthor}
          isPending={isDeleteMessageLoading}
          handleEdit={() => setEditingId(id)}
          handleThread={() => {}}
          handleDelete={() => deleteMessage({ messageId: id })}
          hideThreadButton={false}
        />
      )}
    </div>
  );
};

export default Message;
