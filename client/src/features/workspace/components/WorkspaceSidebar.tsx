import { CurrentWorksapce } from "../types";
import WorkspaceHeader from "./WorkspaceHeader";
type Props = {
  currentWorkspace: CurrentWorksapce;
};
const WorkspaceSidebar = ({ currentWorkspace }: Props) => {
  return (
    <div className="flex flex-col bg-[#5E2C5F] h-full">
      <WorkspaceHeader currentWorkspace={currentWorkspace} />
    </div>
  );
};

export default WorkspaceSidebar;
