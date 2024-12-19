import React from "react";
import Toolbar from "./Toolbar";
import Sidebar from "./Sidebar";
import PageLoading from "@/components/PageLoading";
import { useGetWorkspace } from "../hooks/workspace-queries";
import { useParams } from "@tanstack/react-router";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import WorkspaceSidebar from "./WorkspaceSidebar";
import { CurrentWorkspaceContext } from "../hooks/context";

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
        <CurrentWorkspaceContext.Provider
          value={{ ...workspace, members: [{ id: 1, name: "Shkar" }] }}
        >
          <Sidebar />
          <ResizablePanelGroup
            direction={"horizontal"}
            autoSaveId="slack-clone-workspace-layout"
          >
            <ResizablePanel
              defaultSize={20}
              minSize={11}
              className="bg-[#5E2C5F]"
            >
              <WorkspaceSidebar />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel minSize={20}>{children}</ResizablePanel>
          </ResizablePanelGroup>
        </CurrentWorkspaceContext.Provider>
      </div>
    </div>
  );
};
export default WorkspaceLayout;
