import { Button } from "@/components/ui/button"
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem} from "@/components/ui/dropdown-menu"
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import {useGetMyWorkspaces, useGetWorkspace} from "@/features/workspace/hooks/get-workspace-by-id.ts";
import {useNavigate, useParams} from "@tanstack/react-router";
import {Plus} from "lucide-react";
import {useCreateWorkspaceModal} from "@/features/workspace/hooks/create-workspace-modal.ts";

const WorkspaceSwitcher = () => {
    const navigate= useNavigate();
    const {workspaceId}= useParams({from:"/workspaces/$workspaceId"});
    const {workspace}=useGetWorkspace(parseInt(workspaceId));
    const workspaces= useGetMyWorkspaces();
    const workspacesExceptSelectedOne=workspaces.workspaces?.workspaces?.filter((workspace)=>workspace.id!==parseInt(workspaceId));
   const [_open, setOpen] = useCreateWorkspaceModal();
   
  return (
    <DropdownMenu>
        <DropdownMenuTrigger>
            <Button className="size-9 relative overflow-hidden bg-[#ABABAD] hover:bg-[#ABABAD]/80 text-slate-800 font-semibold text-xl">
                {workspace?.name?.charAt(0)}
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" align="start" className="w-64">
            <DropdownMenuItem className="cursor-pointer flex-col justify-start items-start capitalize">
                {workspace?.name} 
                <span className="text-xs text-muted-foreground">
                    Active Workspace
                </span>
            </DropdownMenuItem>
            {workspacesExceptSelectedOne?.map((workspace) => {
                return (
                    <DropdownMenuItem key={workspace.id} className="cursor-pointer capitalize" onClick={()=>navigate({to:"/workspaces/$workspaceId",params:{workspaceId:workspace.id.toString()}})}>
                        {workspace.name}
                    </DropdownMenuItem>
                )
            })}
            <DropdownMenuItem className="cursor-pointer" onClick={()=>setOpen(true)}>
                <div className="size-9 relative overflow-hidden bg-[#F2F2F2] text-slate-800 font-semibold text-xl rounded-md flex items-center justify-center mr-2">
                    <Plus/>
                </div>
                Create a new workspace
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default WorkspaceSwitcher