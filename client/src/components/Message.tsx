import { format, isToday, isYesterday } from "date-fns";
import Renderer from "./Renderer";
import Hint from "./Hint";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { spawn } from "child_process";

type Props = {
  id: number | string;
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
  setEditingId: (id: string | null) => void;
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
  console.log("UPDATE AT:", updatedAt);
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
            {updatedAt && (
              <span className="text-xs text-muted-foreground">(edited)</span>
            )}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-2 p-1.5 px-0.5 hover:bg-gray-100/60 group relative">
      <div className="flex items-start gap-2">
        <button>
          <Avatar>
            <AvatarImage src={authorImage}></AvatarImage>
            <AvatarFallback className="rounded-md bg-sky-500 text-white text-xs">
              {authorName?.at(0)?.toUpperCase() || "noname"}
            </AvatarFallback>
          </Avatar>
        </button>
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
          {updatedAt !== null && (
            <span className="text-xs text-muted-foreground">(edited)</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
