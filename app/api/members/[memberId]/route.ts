import { db } from "@/lib/db";
import { currentProfile } from "@/lib/user/profile";
import { NextResponse } from "next/server";

export const PATCH = async (
  req: Request,
  { params }: { params: { memberId: string } }
) => {
  try {
    const profile = await currentProfile();
    const { searchParams } = new URL(req.url);

    const { role } = await req.json();
    const serverId = searchParams.get("serverId");

    if (!profile) {
      return new NextResponse("Un", { status: 401 });
    }
    if (!serverId) {
      return new NextResponse("Server Id missing", { status: 400 });
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
          update: {
            where: {
              id: params.memberId,
              profileId: {
                not: profile.id,
              },
            },
            data: {
              role,
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
    return NextResponse.json(server);
  } catch (err) {
    console.log("[MEMBERS_ID_PATCH]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
