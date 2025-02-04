import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
type Props = {
  messageId: number;
  onClose: () => void;
};

const Thread = ({ messageId, onClose }: Props) => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center px-4 h-[49px] border-b">
        <p className="text-lg font-bold">Thread</p>
        <Button size="iconSm" variant="ghost" onClick={() => onClose()}>
          <XIcon className="size-5 stroke-[1.5]" />
        </Button>
      </div>
    </div>
  );
};

export default Thread;
