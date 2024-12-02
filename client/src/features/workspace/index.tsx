import {useCreateWorkspaceModal} from "@/features/workspace/hooks/create-workspace-modal.ts";

const WorkspaceDashboard= () => {
    const [open, setOpen] = useCreateWorkspaceModal();
    setOpen(true);
    return (
        <div>
            YO YO MR WHITE
        </div>
    );
};

export default WorkspaceDashboard;