import { useState } from "react"
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"
import { TooltipProvider } from "@radix-ui/react-tooltip"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import Picker from "@emoji-mart/react"
import data from "@emoji-mart/data"

type Props = {
  children: React.ReactNode
  hint?: string
  onEmojiSelect: (emoji: any) => void
}
const EmojiPopover = ({ hint, children, onEmojiSelect }: Props) => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const onSelect = (emoji: unknown) => {
    onEmojiSelect(emoji);
    setPopoverOpen(false);
    setTimeout(() => {
      setTooltipOpen(false);
    }, 500)
  }
  return (
    <TooltipProvider>
      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <Tooltip open={tooltipOpen} onOpenChange={setTooltipOpen} delayDuration={50}>
          <PopoverTrigger asChild>
            <TooltipTrigger asChild>
              {children}
            </TooltipTrigger>
          </PopoverTrigger>
          <TooltipContent className="bg-black text-white border border-white/5">
            <p className="font-medium text-xs">
              {hint}
            </p>
          </TooltipContent>
        </Tooltip>
        <PopoverContent className="p-0 w-full border-none shadow-none">
          <Picker data={data} onEmojiSelect={onEmojiSelect} />
        </PopoverContent>
      </Popover>
    </TooltipProvider>
  )
}

export default EmojiPopover
