import { Button } from "@/components/ui/button";
import { useCreateWorkspaceModal } from "@/features/workspace/hooks/create-workspace-modal.ts";
import { useAuth } from "../auth/context";
import { useNavigate } from "@tanstack/react-router";
import { useGetMyWorkspaces } from "./hooks/workspace-queries";
import { Skeleton } from "@/components/ui/skeleton";
function WorkspaceCardSkeleton() {
  return (
    <div className="flex items-center justify-between bg-white text-[#5E2C5F] p-4 rounded-lg shadow">
      {/* Workspace Icon Skeleton */}
      <div className="flex items-center gap-3">
        <Skeleton className="w-10 h-10 rounded-md bg-gray-200" />
        <div>
          {/* Workspace Name Skeleton */}
          <Skeleton className="h-4 w-24 bg-gray-200 mb-2" />
          {/* Members Count Skeleton */}
          <Skeleton className="h-3 w-16 bg-gray-100" />
        </div>
      </div>

      {/* Button Skeleton */}
      <Skeleton className="h-8 w-24 bg-gray-200 rounded" />
    </div>
  );
}
function WorkspaceCard({ name, id }: { name: string; id: number }) {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between bg-white text-[#5E2C5F] p-4 rounded-lg shadow hover:bg-slate-50">
      <div className="flex items-center gap-3">
        {/* Workspace Icon */}
        <div className="w-10 h-10 bg-purple-200 rounded-md flex items-center justify-center font-bold">
          {name.charAt(0)}
        </div>
        {/* Workspace Name */}
        <div>
          <p className="font-semibold">{name}</p>
          <p className="text-sm text-gray-500">1 member</p>
        </div>
      </div>
      {/* Launch Button */}
      <Button
        className="bg-[#5E2C5F] text-white px-3 py-1 rounded hover:bg-[#4b224b]"
        onClick={() =>
          navigate({
            to: "/workspaces/$workspaceId",
            params: { workspaceId: id.toString() },
          })
        }
      >
        Launch Slack
      </Button>
    </div>
  );
}
const WorkspaceDashboard = () => {
  const [_open, setOpen] = useCreateWorkspaceModal();
  const { user } = useAuth();
  const { isWorkspacesLoading, workspaces } = useGetMyWorkspaces();

  return (
    <>
      <div className="min-h-screen bg-[#5E2C5F] text-white">
        {/* Main Content */}
        <div className="container mx-auto p-8">
          {/* Welcome Back Section */}
          <h1 className="text-3xl font-bold text-center mb-6">
            👋 Welcome back
          </h1>

          <div className="bg-[#F4E3F5] p-6 rounded-lg shadow-md max-w-2xl mx-auto">
            <h2 className="text-lg font-semibold text-[#5E2C5F] mb-4">
              Workspaces for {user?.email}
            </h2>
            {isWorkspacesLoading ? (
              <div className="flex flex-col gap-y-4">
                <WorkspaceCardSkeleton />
                <WorkspaceCardSkeleton />
              </div>
            ) : (
              <div className="max-h-[400px] overflow-y-auto space-y-4 messages-scrollbar scrollbar-track-gray-100 px-2">
                {workspaces?.workspaces.length > 0 ? (
                  workspaces?.workspaces.map((workspace) => (
                    <WorkspaceCard name={workspace.name} id={workspace.id} />
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center  gap-2">
                    <p className="text-lg font-semibold text-[#5E2C5F] mt-2">
                      No Workspaces Found!
                    </p>
                    <p className="text-[#5E2C5F]">Create a new one!</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer Section */}
          <div className="mt-8 text-center">
            <div className="bg-white text-[#5E2C5F] p-4 rounded-lg shadow-md inline-block">
              <p className="text-sm font-medium mb-2">
                Want to use Slack with a different team?
              </p>
              <Button
                className="bg-[#5E2C5F] text-white px-4 py-2 rounded hover:bg-[#4b224b]"
                onClick={() => setOpen(true)}
              >
                Create a New Workspace
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkspaceDashboard;
