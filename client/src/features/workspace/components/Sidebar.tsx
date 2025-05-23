import { Home, MessageSquare } from "lucide-react";
import UserButton from "./UserButton";
import WorkspaceSwitcher from "./WorkspaceSwitcher";
import SidebarButton from "./SidebarButton";
const Sidebar = () => {
  return (
    <aside className="w-[70px] h-full bg-[#481349] flex flex-col gap-y-4 items-center pt-[9px] pb-[4px]">
      <WorkspaceSwitcher />
      <SidebarButton icon={Home} label="Home" isActive={true} />
      <SidebarButton icon={MessageSquare} label="DM's" isActive={false} />
      <div className="flex flex-col items-center justify-center gap-y-1 mt-auto">
        <UserButton />
      </div>
    </aside>
  );
};

export default Sidebar;
