import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Trash } from "lucide-react";
import { useState } from "react";
import { useDeleteWorkspace } from "../hooks/workspace-queries";
import { useParams } from "@tanstack/react-router";
type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  initialValue: string;
};
const PreferenceModal = ({ initialValue, open, setOpen }: Props) => {
  const { workspaceId } = useParams({ from: "/workspaces/$workspaceId" });
  const [value, setValue] = useState(initialValue);
  const { deleteWorkspace } = useDeleteWorkspace();
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0 bg-gray-50 overflow-hidden">
        <DialogHeader className="p-4 border-b bg-white">
          <DialogTitle>{value}</DialogTitle>
        </DialogHeader>
        <div className="px-4 pb-4 flex flex-col gap-2">
          <div className="px-5 py-4 bg-white rounded-lg border-cursor hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold">Workspace Name</p>
              <p className="text-sm text-[#1264a3] hover:underline font-semibold cursor-pointer">
                Edit
              </p>
            </div>
            <p className="text-sm">{value}</p>
          </div>
          <button
            disabled={false}
            onClick={() => {
              deleteWorkspace(parseInt(workspaceId));
            }}
            className="flex items-center gap-x-2 px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50 text-rose-600"
          >
            <Trash className="size-4" />
            <p className="text-sm font-semibold">Delete workspace</p>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PreferenceModal;
