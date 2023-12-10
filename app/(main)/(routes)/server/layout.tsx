import React from "react";
import SideNavbar from "./SideNavBar/SideNavbar";

const ServerLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <SideNavbar />
      <main className="md:pl-[72px] h-full">{children}</main>
    </div>
  );
};

export default ServerLayout;
