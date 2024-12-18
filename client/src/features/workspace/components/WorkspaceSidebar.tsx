import { MessageSquareText, SendHorizonal } from "lucide-react";
import { CurrentWorksapce } from "../types";
import WorkspaceHeader from "./WorkspaceHeader";
import SidebarItem from "./SidebarItem";
type Props = {
  currentWorkspace: CurrentWorksapce;
};
const WorkspaceSidebar = ({ currentWorkspace }: Props) => {
  return (
    <div className="flex flex-col bg-[#5E2C5F] h-full">
      <WorkspaceHeader currentWorkspace={currentWorkspace} />
      <div className="flex flex-col pt-2 mt-3">
        <SidebarItem label="Threads" icon={MessageSquareText} id={1} />
        <SidebarItem label="Draft & Sent" icon={SendHorizonal} id={22} />
      </div>
    </div>
  );
};

export default WorkspaceSidebar;
