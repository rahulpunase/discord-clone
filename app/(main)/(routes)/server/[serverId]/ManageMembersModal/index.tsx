"use client";

import AppDialog from "@/components/Dialog";
import React, { useState } from "react";
import { useModal } from "@/hooks/use-modal-store";
import { useIsMounted } from "@/hooks/use-is-mounted";
import { ScrollArea } from "@/components/ui/scroll-area";
import UserAvatar from "@/components/UserAvatar";
import {
  Cross,
  MoreVertical,
  ShieldAlert,
  ShieldCheck,
  Trash2Icon,
} from "lucide-react";
import MemberActionDropDown from "./MemberActionDropDown";
import { ServerWithMembersWithProfiles } from "@/types";

export type FormValues = {
  name: string;
  imageUrl: string;
};

const ManageMembersModal = () => {
  const {
    isOpen,
    type,
    onClose,
    data: { server },
    onOpen,
  } = useModal();
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useIsMounted();

  if (!isMounted) {
    return null;
  }

  const isModalOpen = isOpen && type === "manageMembers";

  const RoleIconMap = {
    GUEST: null,
    MODERATOR: <ShieldCheck className="w-4 h-4" />,
    ADMIN: <ShieldAlert className="w-4 h-4 text-rose-400" />,
  };

  const onMemberUpdate = (updatedServer: ServerWithMembersWithProfiles) => {
    onOpen("manageMembers", { server: updatedServer });
  };

  return (
    <AppDialog
      defaultOpen={isModalOpen}
      header="Manage Members"
      description="Add, delete members from server"
      onOpenChange={onClose}
    >
      <div className="p-6 pt-0">
        <div className="text-center text-zinc-500">
          {server?.members.length} Members
        </div>
        <ScrollArea className="mt-8 max-h-[420px] pr-6">
          {server?.members.map((member) => (
            <div key={member.id} className="flex items-center mb-6  gap-x-2">
              <UserAvatar
                imageUrl={member.profile.imageUrl}
                alt={member.profile.name}
              />
              <div className="flex flex-col gap-y-1">
                <div className="text-xs font-semibold flex items-center gap-x-1">
                  {member.profile.name}
                  {RoleIconMap[member.role]}
                </div>
                <p className="text-xs text-zinc-500">{member.profile.email}</p>
              </div>
              {server.profileId !== member.profileId && (
                <div className="ml-auto">
                  <MemberActionDropDown
                    onMemberUpdate={onMemberUpdate}
                    member={member}
                    serverId={server.id}
                  />
                </div>
              )}
            </div>
          ))}
        </ScrollArea>
      </div>
    </AppDialog>
  );
};

export default ManageMembersModal;
