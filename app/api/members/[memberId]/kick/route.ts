import { db } from "@/lib/db";
import { currentProfile } from "@/lib/user/profile";
import { NextResponse } from "next/server";

export const DELETE = async (
  req: Request,
  { params }: { params: { memberId: string } }
) => {
  try {
    const profile = await currentProfile();
    const { searchParams } = new URL(req.url);

    const serverId = searchParams.get("serverId");

    if (!profile) {
      return new NextResponse("Un", { status: 501 });
    }

    if (!serverId) {
      return new NextResponse("Server Id not found", { status: 501 });
    }

    if (!params.memberId) {
      return new NextResponse("Member Id missing", { status: 400 });
    }

    const server = await db.server.update({
      where: {
        id: serverId,
        profileId: profile.id,
      },
      data: {
        members: {
          deleteMany: {
            id: params.memberId,
            profileId: {
              not: profile.id,
            },
          },
        },
      },
      include: {
        members: {
          include: {
            profile: true,
          },
          orderBy: {
            role: "asc",
          },
        },
      },
    });

    console.log(server);

    return NextResponse.json(server);
  } catch (e) {
    console.log("[MEMBERS_KICK_DELETE]", e);
  }
};
