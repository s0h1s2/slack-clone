import { CurrentWorksapce } from "../types";
import UserButton from "./UserButton";
import WorkspaceSwitcher from "./WorkspaceSwitcher";
type Props = {
  currentWorkspace: CurrentWorksapce;
};
const Sidebar = ({ currentWorkspace }: Props) => {
  return (
    <aside className="w-[70px] h-full bg-[#481349] flex flex-col gap-y-4 items-center pt-[9px] pb-[4px]">
      <WorkspaceSwitcher currentWorkspace={currentWorkspace} />
      <div className="flex flex-col items-center justify-center gap-y-1 mt-auto">
        <UserButton />
      </div>
    </aside>
  );
};

export default Sidebar;
