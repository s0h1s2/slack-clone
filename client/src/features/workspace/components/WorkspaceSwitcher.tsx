import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent } from "@/components/ui/dropdown-menu"
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"

const WorkspaceSwitcher = () => {
  return (
    <DropdownMenu>
        <DropdownMenuTrigger>
            <Button className="size-9 relative overflow-hidden bg-[#ABABAD] hover:bg-[#ABABAD]/80 text-slate-800 font-semibold text-xl">
                A
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" align="start" className="w-64">

        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default WorkspaceSwitcher