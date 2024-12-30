import { ResponseError } from "@/api";
import { apiClient } from "@/api/client";
import { useToast } from "@/hooks/use-toast";
import { NetworkError } from "@/lib/errors";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
const WORKSPACE_KEY = "workspace";
export const useGetWorkspace = (id: number) => {
  const {
    data: workspace,
    isLoading: isWorkspaceLoading,
    error: workspaceError,
  } = useQuery({
    queryKey: [WORKSPACE_KEY, id],
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
        toast({ description: "Workspace deleted successfully" });
      } catch (e: ResponseError | Error | unknown) {
        if (e instanceof ResponseError) {
          if (e.response.status == 403) {
            toast({ description: "Only admin can delete workspace", variant: "destructive" });
            return;
          } else if (e.response.status == 404) {
            toast({ description: "Workspace not found", variant: "destructive" });
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
export const useGenerateNewJoinCode = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: generateCode, isPending: isGeneratingCode } = useMutation({
    mutationFn: async (workspaceId: number) => {
      try {
        await apiClient.workspaceApi.apiWorkspacesIdJoinCodePost({ id: workspaceId });
      } catch (e: Error | ResponseError | unknown) {
        throw new NetworkError("Unable to generate new code");
      }
    },
    onSuccess: async (_data, workspaceId) => {
      await queryClient.invalidateQueries({ queryKey: [WORKSPACE_KEY, workspaceId] })
    }
  });
  return {
    isGeneratingCode,
    generateCode
  };
}
