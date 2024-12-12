import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {useCreateWorkspaceModal} from "@/features/workspace/hooks/create-workspace-modal.ts";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {ResponseError} from "@/api";
import {useState} from "react";
import {apiClient} from "@/api/client.ts";
import {useToast} from "@/hooks/use-toast.ts";
import {useRouter} from "@tanstack/react-router";

const CreateWorkspaceModal = () => {
    const [open, setOpen] = useCreateWorkspaceModal();
    const [workspaceName,setWorkspaceName]=useState<string>("");
    const toast=useToast();
    const router=useRouter();
    const createWorkspace=async (e)=>{
        e.preventDefault();
        try {
            const res=await apiClient.workspaceApi.apiWorkspacesPost({createWorkspaceRequest:{name:workspaceName}})
            router.navigate({to:"/workspaces/$workspaceId",params:{workspaceId:res.workspaceId?.toString()}})
            toast.toast({description:"Workspace created successfully",variant: "success"});
            handleClose();
        }catch (e:Error | ResponseError | unknown){
            if(e instanceof ResponseError){
               toast.toast({description:"Error happend while creating workspace",variant: "destructive"});
            }
        }    
    }
    
    const handleClose = () => {
        setOpen(false);
    }
    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogTrigger>Workspace</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add a workspace</DialogTitle>
                </DialogHeader>
                <form className="space-y-4">
                    <Input value={workspaceName} onChange={(e)=>setWorkspaceName(e.target.value)} disabled={false} placeholder="Create a workspace e.g. 'Personal','Work'" />
                    <div className="flex justify-end">
                        <Button onClick={(e)=>createWorkspace(e)}>Create</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateWorkspaceModal;