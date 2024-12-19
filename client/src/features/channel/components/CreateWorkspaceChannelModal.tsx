import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCreateWorkspaceModal } from "@/features/workspace/hooks/create-workspace-modal.ts";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { ResponseError } from "@/api";
import { MouseEventHandler, useState } from "react";
import { apiClient } from "@/api/client.ts";
import { useToast } from "@/hooks/use-toast.ts";
import { useRouter } from "@tanstack/react-router";
import { useCreateChannelModal } from "../store/create-channel-modal";

const CreateWorkspaceChannelModal = () => {
  const [open, setOpen] = useCreateChannelModal();
  const [workspaceName, setWorkspaceName] = useState<string>("");
  const toast = useToast();
  const router = useRouter();
  const createWorkspace = async (e: MouseEventHandler<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const res = await apiClient.workspaceApi.apiWorkspacesPost({
        createWorkspaceRequest: { name: workspaceName },
      });
      router.navigate({
        to: "/workspaces/$workspaceId",
        params: { workspaceId: res.workspaceId.toString() },
      });
      toast.toast({
        description: "Workspace created successfully",
        variant: "success",
      });
      handleClose(false);
    } catch (e: Error | ResponseError | unknown) {
      if (e instanceof ResponseError) {
        toast.toast({
          description: "Error happend while creating workspace",
          variant: "destructive",
        });
      }
    }
  };

  const handleClose = (state: boolean) => {
    setOpen(state);
  };
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a channel</DialogTitle>
        </DialogHeader>
        <form className="space-y-4">
          <Input
            value={workspaceName}
            onChange={(e) => setWorkspaceName(e.target.value)}
            disabled={false}
            placeholder="Create a channel e.g. 'general','project-x'"
          />
          <div className="flex justify-end">
            <Button onClick={(e) => createWorkspace(e)}>Create</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateWorkspaceChannelModal;
