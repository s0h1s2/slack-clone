import {useCreateWorkspaceModal} from "@/features/workspace/hooks/create-workspace-modal.ts";

const WorkspaceDashboard= () => {
    const [_open, setOpen] = useCreateWorkspaceModal();
    setOpen(true);
    return (
        <div>
            
        </div>
    );
};

export default WorkspaceDashboard;