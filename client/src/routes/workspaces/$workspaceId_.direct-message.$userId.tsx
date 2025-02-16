import WorkspaceLayout from "@/features/workspace/components/Layout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/workspaces/$workspaceId_/direct-message/$userId"
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { workspaceId } = Route.useParams();
  return (
    <WorkspaceLayout workspaceId={parseInt(workspaceId)}>
      <h1>WTF?</h1>
    </WorkspaceLayout>
  );
}
