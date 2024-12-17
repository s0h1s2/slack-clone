import { ResponseError } from "@/api";
import { apiClient } from "@/api/client";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation } from "@tanstack/react-query";

export const useGetWorkspace = (id: number) => {
  const {
    data: workspace,
    isLoading: isWorkspaceLoading,
    error: workspaceError,
  } = useQuery({
    queryKey: ["workspace", id],
    queryFn: async () => {
      try {
        return apiClient.workspaceApi.apiWorkspacesIdGet({ id: id });
      } catch (e) {
        throw e;
      }
    },
  });
  return {
    workspace,
    isWorkspaceLoading,
    workspaceError,
  };
};
export const useGetMyWorkspaces = () => {
  const { data: workspaces, isLoading: isWorkspacesLoading } = useQuery({
    queryKey: ["workspaces"],
    queryFn: async () => {
      const workspaces = await apiClient.workspaceApi.apiWorkspacesMyGet();
      return workspaces;
    },
  });
  return {
    workspaces,
    isWorkspacesLoading,
  };
};

export const useDeleteWorkspace = () => {
  const { toast } = useToast();
  const { mutate: deleteWorkspace } = useMutation({
    mutationFn: async (workspaceId: number) => {
      try {
        await apiClient.workspaceApi.apiWorkspacesIdDelete({ id: workspaceId });
        toast({description:"Workspace deleted successfully"});
      } catch (e: ResponseError | Error | unknown) {
        if (e instanceof ResponseError) {
          if (e.response.status == 403) {
            toast({ description: "Only admin can delete workspace",variant: "destructive"});
            return;
          } else if (e.response.status == 404) {
            toast({ description: "Workspace not found",variant: "destructive" });
            return;
          }
        }
        console.error(e);
        toast({ description: "Unknown Error happend" });
      }
    },
  });
  return {
    deleteWorkspace,
  };
};
