import { currentProfile, findServerFromServerId } from "@/lib/user/profile";
import { redirect } from "next/navigation";
import React from "react";
import ServerHeader from "./ServerHeader";

type ChannelSideBarProps = {
  serverId: string;
};

const ChannelSideBar = async ({ serverId }: ChannelSideBarProps) => {
  const profile = await currentProfile();
  const server = await findServerFromServerId(serverId);

  const textChannels = server?.channels.filter(
    (channel) => channel.type === "TEXT"
  );

  const audioChannels = server?.channels.filter(
    (channel) => channel.type === "AUDIO"
  );

  const videoChannels = server?.channels.filter(
    (channel) => channel.type === "VIDEO"
  );

  const members = server?.members.filter(
    (member) => member.profileId !== profile?.id
  );

  if (!server || !profile) {
    return redirect("/");
  }

  const role = server.members.find(
    (member) => member.profileId === profile.id
  )?.role;

  return (
    <div className="hidden md:flex h-full w-60 z-2- flex-col inset-y-0 bg-slate-500 fixed shadow-sm">
      <div>
        <ServerHeader server={server} role={role} />
      </div>
    </div>
  );
};

export default ChannelSideBar;
