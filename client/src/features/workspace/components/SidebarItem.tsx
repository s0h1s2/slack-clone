import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link, useParams } from "@tanstack/react-router";
import { cva, VariantProps } from "class-variance-authority";
import { LucideIcon } from "lucide-react";

const sidebarItemVariants = cva(
  "flex items-center gap-1.5 justify-center font-normal h-7 px-[18px] text-sm overflow-hidden",
  {
    variants: {
      variant: {
        default: "text-[#F9EDFFCC]",
        active: "text-[#481349] bg-white/90 hover:bg-white/90",
      },
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
    <Button variant="transparent" size="sm" className={cn(variant)} asChild>
      <Link
        to="/workspaces/$workspaceId/channels/$channelId"
        params={{ worksapceId: params.workspaceId, channelId: id }}
      >
        <Icon className="size-3.5 mr-1 shrink-0" />
        <span className="text-sm truncate">{label}</span>
      </Link>
    </Button>
  );
};

export default SidebarItem;
