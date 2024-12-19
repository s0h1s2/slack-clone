import { MessageSquareText, SendHorizonal } from "lucide-react";
import WorkspaceHeader from "./WorkspaceHeader";
import SidebarItem from "./SidebarItem";

const WorkspaceSidebar = () => {
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
    </div>
  );
};

export default WorkspaceSidebar;
