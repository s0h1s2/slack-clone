import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import CreateWorkspaceModal from "@/features/workspace/components/CreateWorkspaceModal.tsx";
import CreateWorkspaceChannelModal from "@/features/channel/components/CreateWorkspaceChannelModal";
import { AuthContext } from "@/features/auth/context";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { NuqsAdapter } from "nuqs/adapters/react";

type RouterContext = {
  auth: AuthContext;
};
export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootDocument,
});

function RootDocument() {
  return (
    <>
      <CreateWorkspaceModal />
      <CreateWorkspaceChannelModal />
      <NuqsAdapter>
        <Outlet />
      </NuqsAdapter>
      <TanStackRouterDevtools />
    </>
  );
}
