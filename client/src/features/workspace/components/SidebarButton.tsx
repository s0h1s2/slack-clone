import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
type Props = {
  icon: LucideIcon;
  label: string;
  isActive?: boolean;
};
const SidebarButton = ({ label, isActive, icon: Icon }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center gap-y-0.5 cursor-pointer group">
      <Button
        variant="transparent"
        className={cn(
          "size-9 p-2 group-hover:bg-accent/20",
          isActive && "bg-accent/20"
        )}
      >
        <Icon className="size-5 text-white group-hover:scale-110 transition-all" />
      </Button>
      <span className="text-sm text-white group-hover:text-accent">
        {label}
      </span>
    </div>
  );
};

export default SidebarButton;
