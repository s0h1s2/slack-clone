import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Link } from "@tanstack/react-router";
import { cva, VariantProps } from "class-variance-authority";
import { LucideIcon } from "lucide-react";

const userItemVariants = cva(
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
  userId: number;
  image?: string;
  variant?: VariantProps<typeof userItemVariants>["variant"];
};
const UserItem = ({ label, icon: Icon, userId, variant, image }: Props) => {
  return (
    <Button
      variant="transparent"
      size="sm"
      className={cn(userItemVariants({ variant }))}
      asChild
    >
      <Link
        to="/workspaces/direct-message/$userId"
        params={{
          userId: userId.toString(),
        }}
      >
        <Avatar className="size-5 rounded-md mr-1">
          <AvatarImage className="rounded-md" src={image} />
          <AvatarFallback className="rounded-md bg-sky-500 text-white text-xs">
            {label[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <span className="text-sm truncate">{label}</span>
      </Link>
    </Button>
  );
};

export default UserItem;
