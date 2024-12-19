import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { useGetMyWorkspaces } from "@/features/workspace/hooks/workspace-queries.ts";
import { useNavigate } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { useCreateWorkspaceModal } from "@/features/workspace/hooks/create-workspace-modal.ts";
import { useContext } from "react";
import { CurrentWorkspaceContext } from "../hooks/context";

const WorkspaceSwitcher = () => {
  const currentWorkspace = useContext(CurrentWorkspaceContext);
  if (!currentWorkspace) throw new Error("Current workspace not provided");
  const navigate = useNavigate();
  const workspaces = useGetMyWorkspaces();
  const workspacesExceptSelectedOne = workspaces.workspaces?.workspaces?.filter(
    (workspace) => workspace.id !== currentWorkspace.id
  );
  const [_open, setOpen] = useCreateWorkspaceModal();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button className="size-9 relative overflow-hidden bg-[#ABABAD] hover:bg-[#ABABAD]/80 text-slate-800 font-semibold text-xl">
          {currentWorkspace.name.charAt(0).toUpperCase()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="bottom"
        align="start"
        className="w-64 overflow-y-scroll h-96"
      >
        <DropdownMenuItem className="cursor-pointer flex-col justify-start items-start capitalize">
          {currentWorkspace.name}
          <span className="text-xs text-muted-foreground">
            Active Workspace
          </span>
        </DropdownMenuItem>
        {workspacesExceptSelectedOne?.map((workspace) => {
          return (
            <DropdownMenuItem
              key={workspace.id}
              className="cursor-pointer capitalize"
              onClick={() =>
                navigate({
                  to: "/workspaces/$workspaceId",
                  params: { workspaceId: workspace.id.toString() },
                })
              }
            >
              <div className="shrink-0 size-9 relative overflow-hidden bg-[#616061] text-white font-semibold text-xl rounded-md flex items-center justify-center mr-2">
                {workspace.name?.at(0)?.toUpperCase()}
              </div>
              <p className="truncate">{workspace.name}</p>
            </DropdownMenuItem>
          );
        })}
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <div className="size-9 relative overflow-hidden bg-[#F2F2F2] text-slate-800 font-semibold text-xl rounded-md flex items-center justify-center mr-2">
            <Plus />
          </div>
          Create a new workspace
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default WorkspaceSwitcher;
