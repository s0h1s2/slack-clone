import React from "react";
import Toolbar from "./Toolbar";
import Sidebar from "./Sidebar";

const WorkspaceLayout = ({children}:{children:React.ReactNode}) => {
    return (
        <div className="h-full ">
            <Toolbar/>
            {/* Toolbar is 40px high */}
            <div className="flex h-[calc(100vh-40px)]">
                <Sidebar/>
            {children}
            </div>
        </div>
    );
};
export default WorkspaceLayout;
