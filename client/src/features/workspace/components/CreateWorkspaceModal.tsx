import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {useCreateWorkspaceModal} from "@/features/workspace/hooks/create-workspace-modal.ts";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";

const CreateWorkspaceModal = () => {
    const [open, setOpen] = useCreateWorkspaceModal();
    const handleClose = () => {
        setOpen(false);
    }
    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogTrigger>Workspace</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add a workspace</DialogTitle>
                </DialogHeader>
                <form className="space-y-4">
                    <Input  disabled={false} placeholder="Create a workspace e.g. 'Personal','Work'" />
                    <div className="flex justify-end">
                        <Button>Create</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateWorkspaceModal;