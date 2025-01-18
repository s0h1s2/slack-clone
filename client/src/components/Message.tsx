import Renderer from "./Renderer";

type Props = {
  id: string;
  memberId: string;
  authorImage?: string;
  authorName?: string;
  isAuthor: boolean;
  body: string;
  image: string | null | undefined;
  createdAt: string;
  updatedAt: string;
  isEditing: boolean;
  isCompact?: boolean;
  setEditingId: (id: string | null) => void;
  hideThreadButton?: boolean;
  threadCount?: number;
  threadImage?: string;
  threadTimestamp?: string;
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
  return (
    <div>
      <Renderer value={body} />
    </div>
  );
};

export default Message;
