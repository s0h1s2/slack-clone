import React from "react";
import Toolbar from "./Toolbar";
import Sidebar from "./Sidebar";
import PageLoading from "@/components/PageLoading";
import { useGetWorkspace } from "../hooks/get-workspace-by-id";
import { useParams } from "@tanstack/react-router";

const WorkspaceLayout = ({ children }: { children: React.ReactNode }) => {
  const { workspaceId } = useParams({ from: "/workspaces/$workspaceId" });
  const { workspace, isWorkspaceLoading } = useGetWorkspace(
    parseInt(workspaceId)
  );
  if (isWorkspaceLoading) return <PageLoading />;
  if (!workspace) return <div>No workspace found!</div>;
  return (
    <div className="h-full ">
      <Toolbar workspaceName={workspace.name} />
      {/* Toolbar is 40px high */}
      <div className="flex h-[calc(100vh-40px)]">
        <Sidebar currentWorkspace={workspace} />
        {children}
      </div>
    </div>
  );
};
export default WorkspaceLayout;
