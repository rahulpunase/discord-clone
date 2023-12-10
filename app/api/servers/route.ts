import { createUserServer, currentProfile } from "@/lib/user/profile";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { name, imageUrl } = await req.json();
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("No Profile Found", { status: 401 });
    }

    const server = await createUserServer(profile.id, name, imageUrl);
    return NextResponse.json(server);
  } catch (error) {
    console.log("[SERVERS_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
