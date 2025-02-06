import React from "react";
import Toolbar from "./Toolbar";
import Sidebar from "./Sidebar";
import PageLoading from "@/components/PageLoading";
import { useGetWorkspace } from "../hooks/workspace-queries";
import { useParams, useParentMatches } from "@tanstack/react-router";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import WorkspaceSidebar from "./WorkspaceSidebar";
import { CurrentWorkspaceContext } from "../hooks/context";
import { useGetChannels } from "@/features/channel/channel-service";
import { usePanel } from "@/hooks/use-panel";
import Thread from "@/features/messages/components/Thread";

const WorkspaceLayout = ({
  workspaceId,
  children,
}: {
  workspaceId: number;
  children: React.ReactNode;
}) => {
  const { workspace, isWorkspaceLoading } = useGetWorkspace(
    parseInt(workspaceId)
  );

  const { parentMsgId, onCloseMessage } = usePanel();
  const { channels, isChannelsLoading } = useGetChannels(parseInt(workspaceId));
  if (isWorkspaceLoading || isChannelsLoading) return <PageLoading />;
  if (!workspace) return <div>No workspace found!</div>;
  if (!channels) return <div>Channels error</div>;
  const showPanel = !!parentMsgId;
  return (
    <div className="h-full ">
      <Toolbar workspaceName={workspace.name} />
      {/* Toolbar is 40px high */}
      <div className="flex h-[calc(100vh-40px)]">
        <CurrentWorkspaceContext.Provider
          value={{ ...workspace, channels: channels }}
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
            {showPanel && (
              <>
                <ResizableHandle withHandle />
                <ResizablePanel minSize={20} defaultSize={29}>
                  {parentMsgId ? (
                    <Thread
                      workspaceId={workspaceId}
                      parentMessageId={parentMsgId}
                      onClose={onCloseMessage}
                    />
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      <PageLoading />
                    </div>
                  )}
                </ResizablePanel>
              </>
            )}
          </ResizablePanelGroup>
        </CurrentWorkspaceContext.Provider>
      </div>
    </div>
  );
};
export default WorkspaceLayout;
