import React from "react";
import ChannelSideBar from "../ChannelSideBar/ChannelSideBar";
import { findServerFromServerId } from "@/lib/user/profile";
import { redirect } from "next/navigation";

const ServerIdLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    serverId: string;
  };
}) => {
  const server = await findServerFromServerId(params.serverId);
  if (!server) {
    return redirect("/");
  }
  return (
    <div className="flex h-full">
      <ChannelSideBar serverId={server.id} />
      <main className="h-full w-full md:pl-60">{children}</main>
    </div>
  );
};

export default ServerIdLayout;
