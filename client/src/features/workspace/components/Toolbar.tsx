import {Button} from "@/components/ui/button.tsx";
import {useGetWorkspace} from "../hooks/get-workspace-by-id";
import {Info, Search} from "lucide-react";
import { useParams } from "@tanstack/react-router";

const Toolbar = () => {
    const {workspaceId}=useParams({from:"/workspaces/$workspaceId"});
    const {workspace,isWorkspaceLoading}=useGetWorkspace(parseInt(workspaceId))
    if(isWorkspaceLoading) return "Loading...";

    return (
        <nav className="bg-[#481349] flex items-center justify-between h-10 p-1.5">
            <div className="flex-1"/>
            <div className="min-w-[280px] max-[642px] grow-[2] shrink">
                <Button size="sm" className="bg-accent/25 hover:background-accent-25 w-full justify-start px-2">
                    <Search className="size-4 text-white mr-2"/>
                    <span className="text-white text-xs">
                        Search {workspace?.name}
                    </span>
                </Button>
            </div>
            <div className="ml-auto flex-1 flex items-center justify-end">
                <Button size="iconSm" variant="transparent" >
                    <Info className="size-5 text-white "/>
                </Button>
            </div>
        </nav>
    );
};

export default Toolbar;


