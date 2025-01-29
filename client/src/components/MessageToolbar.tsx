import { MessageSquareText, Pencil, Smile, Trash } from "lucide-react";
import { Button } from "./ui/button";
import Hint from "./Hint";
import EmojiPopover from "./EmojiPopover";

type Props = {
  isAuthor: boolean;
  isPending: boolean;
  handleEdit: () => void;
  handleThread: () => void;
  handleDelete: () => void;
  hideThreadButton: boolean;
};
const MessageToolbar = ({
  isAuthor,
  isPending,
  handleDelete,
  handleEdit,
  handleThread,
  hideThreadButton,
}: Props) => {
  return (
    <div className="absolute top-0 right-5 ">
      <div className="group-hover:opacity-100 opacity-0 transition-opacity bg-white rounded-md shadow-sm">
        <EmojiPopover hint="Add Reaction" onEmojiSelect={() => {}}>
          <Button variant="ghost" size="iconSm" disabled={isPending}>
            <Smile className="size-4" />
          </Button>
        </EmojiPopover>
        {!hideThreadButton && (
          <Hint label="Reply In Thread">
            <Button variant="ghost" size="iconSm" disabled={isPending}>
              <MessageSquareText className="size-4" />
            </Button>
          </Hint>
        )}
        {isAuthor && (
          <>
            <Hint label="Edit Message">
              <Button variant="ghost" size="iconSm" disabled={isPending}>
                <Pencil className="size-4" />
              </Button>
            </Hint>

            <Hint label="Delete Message">
              <Button variant="ghost" size="iconSm" disabled={isPending}>
                <Trash className="size-4" />
              </Button>
            </Hint>
          </>
        )}
      </div>
    </div>
  );
};

export default MessageToolbar;
