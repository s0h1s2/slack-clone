import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  initialValue: string;
};
const PreferenceModal = ({ initialValue, open, setOpen }: Props) => {
  const [value, setValue] = useState(initialValue);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0 bg-gray-50 overflow-hidden">
        <DialogHeader className="p-4 border-b bg-white">
          <DialogTitle>{value}</DialogTitle>
        </DialogHeader>
        <div className="px-4 pb-4 flex flex-col"></div>
      </DialogContent>
    </Dialog>
  );
};

export default PreferenceModal;
