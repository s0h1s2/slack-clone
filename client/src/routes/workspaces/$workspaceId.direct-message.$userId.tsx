import WorkspaceLayout from "@/features/workspace/components/Layout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/workspaces/$workspaceId/direct-message/$userId"
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <WorkspaceLayout workspaceId={1}>
      <div>Hello</div>
    </WorkspaceLayout>
  );
}
