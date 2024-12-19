import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link, useParams } from "@tanstack/react-router";
import { cva, VariantProps } from "class-variance-authority";
import { LucideIcon } from "lucide-react";

const sidebarItemVariants = cva(
  "flex items-center justify-start  gap-1.5 font-normal h-7 text-[18px] text-sm overflow-hidden",
  {
    variants: {
      variant: {
        default: "text-[#F9EDFFCC]",
        active: "text-[#481349] bg-white/90 hover:bg-white/90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);
type Props = {
  label: string;
  icon: LucideIcon;
  id: number;
  variant?: VariantProps<typeof sidebarItemVariants>["variant"];
};
const SidebarItem = ({ label, icon: Icon, id, variant }: Props) => {
  const params = useParams({ from: "/workspaces/$workspaceId" });

  return (
    <Button
      variant="transparent"
      size="sm"
      className={cn(sidebarItemVariants({ variant }))}
      asChild
    >
      <Link
        to="/workspaces/$workspaceId/channels/$channelId"
        params={{
          workspaceId: params.workspaceId.toString(),
          channelId: id.toString(),
        }}
      >
        <Icon className="size-3.5 mr-1 shrink-0" />
        <span className="text-sm truncate">{label}</span>
      </Link>
    </Button>
  );
};

export default SidebarItem;
