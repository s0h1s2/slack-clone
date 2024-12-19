import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import CreateWorkspaceModal from "@/features/workspace/components/CreateWorkspaceModal.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CreateWorkspaceChannelModal from "@/features/channel/components/CreateWorkspaceChannelModal";
const queryClient = new QueryClient();

export const Route = createRootRoute({
  component: () => (
    <React.Fragment>
      <QueryClientProvider client={queryClient}>
        <Outlet />
        <CreateWorkspaceModal />
        <CreateWorkspaceChannelModal />
      </QueryClientProvider>
    </React.Fragment>
  ),
});
