import { findServer, loadProfile } from "@/lib/user/profile";
import { redirect } from "next/navigation";
import React from "react";
import InitialModal from "./InitialModal";

const SetupPage = async () => {
  const server = await findServer();

  if (server) {
    return redirect(`/server/${server.id}`);
  }
  return (
    <div>
      <InitialModal />
    </div>
  );
};

export default SetupPage;
