import {
  currentProfile,
  existingServer,
  joinMemberToServer,
} from "@/lib/user/profile";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

type InvitePageProps = {
  params: {
    inviteCode: string;
  };
};

const InvitePage = async ({ params }: InvitePageProps) => {
  const profile = await currentProfile();
  if (!profile) {
    return redirectToSignIn();
  }

  if (!params.inviteCode) {
    return redirect("/");
  }

  const ifExistingServer = await existingServer(params.inviteCode, profile.id);
  if (ifExistingServer) {
    return redirect(`/server/${ifExistingServer.id}`);
  }

  const joinMember = await joinMemberToServer(params.inviteCode, profile.id);

  if (joinMember) {
    return redirect(`/server/${joinMember.id}`);
  }

  return null;
};

export default InvitePage;
