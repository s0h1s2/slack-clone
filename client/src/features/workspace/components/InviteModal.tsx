import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { CopyIcon, RefreshCcw } from 'lucide-react';
import { useGenerateNewJoinCode } from '../hooks/workspace-queries';
import { useContext } from 'react';
import { CurrentWorkspaceContext } from '../hooks/context';
type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  name: string
  joinCode: string
}
const InviteModal = ({ open, setOpen, name, joinCode }: Props) => {
  const { toast } = useToast();
  const { generateCode, isGeneratingCode } = useGenerateNewJoinCode();
  const currWorksapce = useContext(CurrentWorkspaceContext)
  if (!currWorksapce) throw new Error("Not in worksapce");
  const handleCopy = () => {
    const inviteLink = `${window.location.origin}/join/${joinCode}`
    navigator.clipboard.writeText(inviteLink).then(() => {
      toast({ title: "Clipoard", description: "Invite link copied successfully", variant: "success" })
    }).catch(() => {
      toast({ title: "Clipoard", description: "Unable to copy link", variant: "success" })
    });
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite people to your {name}</DialogTitle>
          <DialogDescription>Use the code below to invite people to your workspace</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-y-4 items-center justify-center py-10">
          <p className="text-4xl font-bold tracking-widest uppercase">{joinCode}</p>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
          >
            Copy Link
            <CopyIcon className="size-4 ml-2" />
          </Button>
        </div>
        <div className="flex items-center justify-between w-full">
          <Button onClick={() => generateCode(currWorksapce.id)} disabled={isGeneratingCode} variant="outline">
            New code
            <RefreshCcw className="size-4 ml-2" />
          </Button>
          <DialogClose asChild>
            <Button>Close</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog >
  )
}

export default InviteModal
