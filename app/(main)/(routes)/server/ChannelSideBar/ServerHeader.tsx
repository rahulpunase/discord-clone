"use client";
import { ServerWithMembersWithProfiles } from "@/types";
import { MemberRole, Server } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  LogOutIcon,
  PlusCircle,
  Settings,
  Trash2Icon,
  User,
  UserPlus,
} from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";

type ServerHeaderProps = {
  server: ServerWithMembersWithProfiles;
  role?: MemberRole;
};

const ServerHeader = ({ server, role }: ServerHeaderProps) => {
  const { onOpen } = useModal();
  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = isAdmin || role === MemberRole.MODERATOR;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="focus:outline-none">
        <button className="w-full text-md px-3 flex items-center h-12  hover:bg-slate-600 transition border-b-2 border-b-slate-600">
          {server.name}
          <ChevronDown className="h-5 w-5 ml-auto" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 text-xs">
        {isModerator && (
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() =>
              onOpen("invitePeople", {
                server,
              })
            }
          >
            Invite People
            <UserPlus className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem
            onClick={() =>
              onOpen("serverSettings", {
                server,
              })
            }
            className="cursor-pointer"
          >
            Server Settings
            <Settings className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem
            onClick={() => onOpen("manageMembers", { server })}
            className="cursor-pointer"
          >
            Manage Members
            <User className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {isModerator && (
          <DropdownMenuItem className="cursor-pointer">
            Create Channel
            <PlusCircle className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {isModerator && <DropdownMenuSeparator />}
        {isAdmin && (
          <DropdownMenuItem className="text-rose-500 cursor-pointer">
            Delete Server
            <Trash2Icon className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {!isAdmin && (
          <DropdownMenuItem className="cursor-pointer">
            Leave Server
            <LogOutIcon className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem className="text-rose-500 cursor-pointer">
            Delete Server
            <Trash2Icon className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ServerHeader;
