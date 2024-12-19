import { HashIcon, MessageSquareText, SendHorizonal } from "lucide-react";
import WorkspaceHeader from "./WorkspaceHeader";
import SidebarItem from "./SidebarItem";
import { useContext } from "react";
import { CurrentWorkspaceContext } from "../hooks/context";
import WorkspaceSection from "./WorkspaceSection";

const WorkspaceSidebar = () => {
  const workspace = useContext(CurrentWorkspaceContext);

  return (
    <div className="flex flex-col bg-[#5E2C5F] h-full">
      <WorkspaceHeader />
      <div className="flex flex-col pt-2 mt-3">
        <SidebarItem
          label="Threads"
          icon={MessageSquareText}
          id={1}
          variant="active"
        />
        <SidebarItem label="Draft & Sent" icon={SendHorizonal} id={22} />
      </div>
      <WorkspaceSection
        hint="Create a new channel"
        label="Channels"
        onNew={() => {}}
      >
        {workspace?.channels.map((channel) => (
          <SidebarItem
            key={channel.id}
            label={channel.name}
            icon={HashIcon}
            id={channel.id}
          />
        ))}
      </WorkspaceSection>
    </div>
  );
};

export default WorkspaceSidebar;
