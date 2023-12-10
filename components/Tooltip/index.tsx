import React from "react";
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from "../ui/tooltip";

type TooltipProps = {
  label: string;
  side: "left" | "right" | "bottom" | "top";
  align: "start" | "center" | "end";
  children: React.ReactNode;
};
const AppTooltip = ({ align, children, label, side }: TooltipProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={side} align={align}>
          <p className="font-semibold">{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default AppTooltip;
