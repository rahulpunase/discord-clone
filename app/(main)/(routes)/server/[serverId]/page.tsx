import React from "react";
import CreateServerModal from "./CreateServerModal";
import InvitePeopleModal from "./InvitePeopleModal";
import ServerSettingsModal from "./ServerSettingsModal";
import ManageMembersModal from "./ManageMembersModal";

const ServerIdPage = () => {
  return (
    <div>
      <CreateServerModal />
      <InvitePeopleModal />
      <ServerSettingsModal />
      <ManageMembersModal />
    </div>
  );
};

export default ServerIdPage;
