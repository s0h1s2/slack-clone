import {createFileRoute} from '@tanstack/react-router'
import WorkspacePage from "@/features/workspace/WorkspacePage.tsx";

export const Route = createFileRoute('/workspaces/$workspaceId')({
  component: () => {
    const {workspaceId}=Route.useParams();
    return <WorkspacePage workspaceId={parseInt(workspaceId)}/>
  }
})
