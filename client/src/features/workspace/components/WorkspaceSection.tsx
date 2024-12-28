import { Button } from "@/components/ui/button";
import { FaCaretDown } from "react-icons/fa";
import React from "react";
import Hint from "@/components/Hint";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  label: string;
  hint: string;
  onNew?: () => void;
};
const WorkspaceSection = ({ children, hint, label, onNew }: Props) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex flex-col mt-3 px-2">
      <div className="flex items-center px-3.5 group">
        <Button
          variant="transparent"
          className="p-0.5 text-sm text-[#F9EDFFCC] shrink-0 size-6"
          onClick={() => setOpen(!open)}
        >
          <FaCaretDown
            className={cn("size-4 transition-transform", open && "-rotate-90")}
          />
        </Button>
        <Button
          variant="transparent"
          size="sm"
          className="group px-1.5 text-sm text-[#F9EDFFCC] h-[28px] justify-start overflow-hidden items-center"
        >
          <span className="truncate">{label}</span>
        </Button>
        {onNew && (
          <Hint label={hint} side="top" align="center">
            <Button
              onClick={onNew}
              variant="transparent"
              size="iconSm"
              className="opacity-0 group-hover:opacity-100 transition-opacity ml-auto p-0.5 text-sm text-[#F9EDFFCC] shrink-0 size-6"
            >
              <Plus className="size-5" />
            </Button>
          </Hint>
        )}
      </div>
      {open && children}
    </div>
  );
};

export default WorkspaceSection;
