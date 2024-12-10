import * as React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import CreateWorkspaceModal from "@/features/workspace/components/CreateWorkspaceModal.tsx";

export const Route = createRootRoute({
  component: () => (
    <React.Fragment>
      <Outlet />
        <CreateWorkspaceModal/>
    </React.Fragment>
  ),
})
