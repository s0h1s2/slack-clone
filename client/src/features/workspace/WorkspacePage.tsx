import { Button } from "@/components/ui/button";
import WorkspaceLayout from "@/features/workspace/components/Layout.tsx";
import { MessageSquare } from "lucide-react";
import { useCreateChannelModal } from "../channel/store/create-channel-modal";

const WorkspacePage = ({ workspaceId }: { workspaceId: number }) => {
  const [_openChannelModal, setOpenChannelModal] = useCreateChannelModal();
  return (
    <WorkspaceLayout workspaceId={workspaceId}>
      <div className="flex flex-col items-center justify-center h-full text-gray-400">
        <MessageSquare className="w-16 h-16 text-gray-500 mb-4" />

        <h2 className="text-2xl font-semibold text-gray-300">
          No Channel Selected
        </h2>
        <p className="text-gray-400 mt-2">
          Select a channel to start chatting or create a new one.
        </p>

        <Button
          className="bg-purple-800 mt-6"
          onClick={() => setOpenChannelModal(true)}
        >
          Create Channel
        </Button>
      </div>
      );
    </WorkspaceLayout>
  );
};

export default WorkspacePage;
