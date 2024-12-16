import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
type Side = React.ComponentProps<typeof TooltipContent>["side"];
type Align = React.ComponentProps<typeof TooltipContent>["align"];

type Props = {
  label: string;
  children: React.ReactNode;
  side?: Side;
  align?: Align;
};
const Hint = ({ children, side, align, label }: Props) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={50}>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent
          className="bg-black text-white border border-white/5"
          side={side}
          align={align}
        >
          <p className="font-medium text-xs ">{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default Hint;
