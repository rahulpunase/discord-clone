"use client";

import AppTooltip from "@/components/Tooltip";
import { useModal } from "@/hooks/use-modal-store";
import { Plus } from "lucide-react";
import React from "react";

type NavigationActionProps = {
  serverName: string;
};

const NavigationAction = ({ serverName }: NavigationActionProps) => {
  const { onOpen } = useModal();
  return (
    <div>
      <button
        onClick={() => {
          onOpen("createServer");
        }}
      >
        <AppTooltip align="center" side="right" label={serverName}>
          <div className="group flex mx-3 h-[48px] w-[48px] rounded-[24px] hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-slate-950 hover:bg-emerald-500">
            <Plus
              className="group-hover:text-white transition text-emerald-500"
              size={30}
            />
          </div>
        </AppTooltip>
      </button>
    </div>
  );
};

export default NavigationAction;
