"use client";

import React from "react";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import AppTooltip from "@/components/Tooltip";
import { cn } from "@/lib/utils";

type NavigationItemProps = {
  id: string;
  imageUrl: string;
  name: string;
};

export const NavigationItem = ({ id, imageUrl, name }: NavigationItemProps) => {
  const params = useParams();
  const router = useRouter();

  const selectedServer = params?.serverId === id;
  return (
    <AppTooltip side="right" align="center" label={name}>
      <button
        className="group relative flex item-center my-6"
        onClick={() => router.push(`/server/${id}`)}
      >
        <div
          className={cn(
            "my-auto absolute left-0 bg-slate-900 rounded-r-full transition-all w-[4px] h-[48px]",
            selectedServer && "bg-slate-300"
          )}
        />
        <div
          className={cn(
            "relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] overflow-hidden group-hover:rounded-[16px] transition-all",
            selectedServer && "bg-slate-900 text-primary rounded-[16px] "
          )}
        >
          <Image fill src={imageUrl} alt={name} />
        </div>
      </button>
    </AppTooltip>
  );
};
