import { currentProfile, updateServerInviteCode } from "@/lib/user/profile";
import { NextResponse } from "next/server";

export const PATCH = async (
  req: Request,
  { params }: { params: { serverId: string } }
) => {
  try {
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Un", { status: 401 });
    }
    if (!params.serverId) {
      return new NextResponse("Server ID missing", { status: 400 });
    }

    const server = await updateServerInviteCode(params.serverId, profile.id);
    return NextResponse.json(server);
  } catch (error) {}
};
