import WorkspacePage from '@/features/workspace/WorkspacePage';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/workspaces/$workspaceId')({
  component: RouteComponent,
})

function RouteComponent() {
    const {workspaceId}=Route.useParams();
    return <WorkspacePage workspaceId={parseInt(workspaceId)}/>
  
}
