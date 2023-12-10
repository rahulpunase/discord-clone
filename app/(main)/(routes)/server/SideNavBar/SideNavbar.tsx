import { currentProfile, findAllUserServers } from "@/lib/user/profile";
import { redirect } from "next/navigation";
import React from "react";
import NavigationAction from "./NavigationAction";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NavigationItem } from "./NavigationItem";
import { UserButton } from "@clerk/nextjs";

const SideNavbar = async () => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }

  const servers = await findAllUserServers(profile.id);
  return (
    <div className="bg-slate-700 hidden md:flex h-full w-[72px] z-30 flex-col fixed inset-y-0">
      <div className="space-y-7 flex flex-col items-center h-full text-primary w-full py-3">
        <NavigationAction serverName={servers[0].name} />
        <Separator className="h-[2px] bg-slate-800 mx-auto w-12" />
        <ScrollArea className="flex-1 w-full">
          {servers.map((server) => (
            <NavigationItem
              key={server.id}
              id={server.id}
              imageUrl={server.imageUrl}
              name={server.name}
            />
          ))}
        </ScrollArea>
        <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "h-[48px] w-[48px] rounded-h-16",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SideNavbar;
