import { createFileRoute } from '@tanstack/react-router'
import WorkspaceDashboard from "@/features/workspace";

export const Route = createFileRoute('/workspaces/')({
  component: Workspace,
})

function Workspace() {
  return <WorkspaceDashboard/>
}
