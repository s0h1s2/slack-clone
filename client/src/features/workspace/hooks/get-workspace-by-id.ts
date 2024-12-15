import { apiClient } from "@/api/client";
import { useQuery } from "@tanstack/react-query";
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
