import WorkspaceLayout from "@/features/workspace/components/Layout.tsx";

const WorkspacePage = ({workspaceId}:{workspaceId:number}) => {
    return (
        <WorkspaceLayout workspaceId={workspaceId}>
            {workspaceId}
        </WorkspaceLayout>
    );
};

export default WorkspacePage;
