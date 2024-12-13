import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Popover,PopoverTrigger, PopoverContent } from "@/components/ui/popover"

const UserButton = () => {
  return (
    <DropdownMenu>
        <DropdownMenuTrigger className="outline-none relative">
            <Avatar className="size-10 hover:opacity-75 transition"/>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" side="right" className="w-60">
            <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserButton