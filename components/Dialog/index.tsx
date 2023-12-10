import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type AppDialogProps = {
  defaultOpen: boolean;
  header: React.ReactNode | string;
  children: React.ReactNode;
  description?: string;
  onOpenChange?: () => void;
};

const AppDialog = ({
  header,
  description,
  defaultOpen,
  children,
  onOpenChange,
}: AppDialogProps) => {
  return (
    <Dialog open={defaultOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white text-black overflow-hidden p-0">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-center font-bold">{header}</DialogTitle>
          {description && (
            <DialogDescription className="text-center">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
        <div className="pt-8">{children}</div>
      </DialogContent>
    </Dialog>
  );
};

AppDialog.DialogFooter = DialogFooter;

export default AppDialog;
