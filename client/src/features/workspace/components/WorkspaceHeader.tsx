import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CurrentWorksapce } from "../types";
import { ChevronDown, SquarePen } from "lucide-react";
import Hint from "@/components/Hint";
import PreferenceModal from "./PreferenceModal";
import { useContext, useState } from "react";
import { CurrentWorkspaceContext } from "../hooks/context";
type Props = {
  currentWorkspace: CurrentWorksapce;
};
const WorkspaceHeader = () => {
  const [perferenceOpen, setPerferenceOpen] = useState(false);
  const currentWorkspace = useContext(CurrentWorkspaceContext);
  if (!currentWorkspace) throw new Error("Workspace context not provided");

  return (
    <>
      <PreferenceModal
        initialValue={currentWorkspace.name}
        open={perferenceOpen}
        setOpen={setPerferenceOpen}
      />
      <div className="flex items-center justify-between px-4 h-[49px] gap-0.5">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="transparent"
              className="font-semibold text-lg w-auto p-1.5 overflow-hidden"
              size="sm"
            >
              <span className="truncate">{currentWorkspace.name}</span>
              <ChevronDown className="size-4 ml-1 shrink-0" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="bottom" className="w-64">
            <DropdownMenuItem className="cursor-pointer capitalize">
              <div className="size-9 relative overflow-hidden bg-[#616061] text-white font-semibold text-xl rounded-md flex items-center justify-center">
                {currentWorkspace.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col items-start">
                <p className="font-bold">{currentWorkspace.name}</p>
                <p className="text-xs text-muted-foreground">
                  Active worksapce
                </p>
              </div>
            </DropdownMenuItem>
            {currentWorkspace.isAdmin && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer py-2"
                  onClick={() => {}}
                >
                  Invite people to {currentWorkspace.name}
                </DropdownMenuItem>
              </>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer py-2"
              onClick={() => setPerferenceOpen(true)}
            >
              Preference
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="flex items-center gap-0.5">
          <Hint label="New Message" side="bottom">
            <Button variant="transparent" size="iconSm">
              <SquarePen className="size-4" />
            </Button>
          </Hint>
        </div>
      </div>
    </>
  );
};

export default WorkspaceHeader;
