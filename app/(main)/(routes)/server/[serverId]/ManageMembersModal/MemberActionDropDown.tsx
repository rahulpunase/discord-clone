import React from "react";
import qs from "query-string";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSubTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Check,
  Gavel,
  MoreVertical,
  Shield,
  ShieldCheck,
  ShieldQuestion,
} from "lucide-react";
import { DropdownMenuPortal } from "@radix-ui/react-dropdown-menu";
import { Member, MemberRole } from "@prisma/client";
import { kickMemberFromServer, updateMemberRole } from "@/lib/axios/members";
const MemberActionDropDown = ({
  serverId,
  member,
  onMemberUpdate,
}: {
  serverId: string;
  member: Member;
  onMemberUpdate: (updatedServer: any) => void;
}) => {
  const changeUserRole = async (role: MemberRole) => {
    const url = qs.stringifyUrl({
      url: `/api/members/${member.id}`,
      query: {
        serverId,
      },
    });
    const updatedServer = await updateMemberRole(url, role);
    onMemberUpdate(updatedServer);
  };

  const kickMemberOut = async () => {
    const url = qs.stringifyUrl({
      url: `/api/members/${member.id}/kick`,
      query: {
        serverId,
      },
    });
    const updatedServer = await kickMemberFromServer(url);
    onMemberUpdate(updatedServer);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreVertical className="h-4 w-4 text-zinc-500" />
      </DropdownMenuTrigger>
      <DropdownMenuContent side="left">
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="flex items-center">
            <ShieldQuestion className="h-4 w-4 mr-2" />
            <span>Role</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => changeUserRole("GUEST")}>
                <Shield className="h-4 w-4 mr-2" />
                Guest
                {member.role === "GUEST" && (
                  <Check className="ml-auto text-green-500 h-4 w-4 mr-2" />
                )}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => changeUserRole("MODERATOR")}>
                <ShieldCheck className="h-4 w-4 mr-2" />
                Moderator
                {member.role === "MODERATOR" && (
                  <Check className="ml-auto text-green-500 h-4 w-4 mr-2" />
                )}
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={kickMemberOut} className="text-rose-500">
          <Gavel className="h-4 w-4 mr-2" />
          Kick
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MemberActionDropDown;
