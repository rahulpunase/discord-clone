"use client";

import AppDialog from "@/components/Dialog";
import React, { useEffect, useState } from "react";
import { useModal } from "@/hooks/use-modal-store";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Check, Copy, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useOrigin } from "@/hooks/use-origin";
import { useIsMounted } from "@/hooks/use-is-mounted";
import { getNewInviteCode } from "@/lib/axios/servers";

export type FormValues = {
  name: string;
  imageUrl: string;
};

const InvitePeopleModal = () => {
  const { isOpen, type, onClose, data, onOpen } = useModal();
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useIsMounted();
  const origin = useOrigin();

  const inviteLink = `${origin}/invite/${data.server?.inviteCode}`;

  if (!isMounted) {
    return null;
  }

  const isModalOpen = isOpen && type === "invitePeople";

  const onCopy = () => {
    navigator.clipboard.writeText(inviteLink);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1000);
  };

  const generateLink = async () => {
    if (!data.server?.id) {
      return null;
    }
    setIsLoading(true);
    const server = await getNewInviteCode(data.server?.id);
    setIsLoading(false);
    if (!server) {
      return;
    }
    onOpen("invitePeople", { server });
  };

  return (
    <AppDialog
      defaultOpen={isModalOpen}
      header="Invite People"
      description="Invite your friends, colleagues to join your server and have a conversation"
      onOpenChange={onClose}
    >
      <div className="p-6">
        <Label className="uppercase text-xs font-bold">
          Server Invite Link
        </Label>
        <div className="flex items-center mt-2 gap-x-2">
          <Input value={inviteLink} />
          <Button
            disabled={isLoading}
            size="icon"
            variant="outline"
            onClick={onCopy}
          >
            {isCopied ? (
              <Check className="w-4 h-4" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </Button>
        </div>
        <Button
          onClick={generateLink}
          variant="link"
          size="sm"
          className="text-zinc-500"
          disabled={isLoading}
        >
          Generate new link
          <RefreshCcw className="ml-2 selection:w-4 h-4" />
        </Button>
      </div>
    </AppDialog>
  );
};

export default InvitePeopleModal;
