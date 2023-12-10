import {
  currentProfile,
  updateServer,
  updateServerInviteCode,
} from "@/lib/user/profile";
import { NextResponse } from "next/server";

export const PATCH = async (
  req: Request,
  { params }: { params: { serverId: string } }
) => {
  try {
    const profile = await currentProfile();
    const { name, imageUrl } = await req.json();

    if (!profile) {
      return new NextResponse("Un", { status: 401 });
    }
    if (!params.serverId) {
      return new NextResponse("Server ID missing", { status: 400 });
    }

    const server = await updateServer(params.serverId, {
      name,
      imageUrl,
    });
    return NextResponse.json(server);
  } catch (error) {}
};
