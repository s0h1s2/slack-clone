import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/workspaces/$workspaceId')({
  component: Workspace,
})

function Workspace() {
  const params = Route.useParams();
  return (
    <div>Workspace {params.workspaceId} </div>
  )
}


