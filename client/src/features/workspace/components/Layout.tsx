import React from "react";
import Toolbar from "@/components/Toolbar.tsx";

const WorkspaceLayout = ({children}:{children:React.ReactNode}) => {
    return (
        <div className="h-full ">
            <Toolbar/>
            {children}
        </div>
    );
};
export default WorkspaceLayout;
