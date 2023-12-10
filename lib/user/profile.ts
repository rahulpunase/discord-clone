import { auth, currentUser, redirectToSignIn } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";
import { FormValues } from "@/app/(main)/(routes)/server/[serverId]/CreateServerModal";

export const loadProfile = async () => {
  const user = await currentUser();
  if (!user) {
    return redirectToSignIn();
  }

  const profile = await db.profile.findUnique({
    where: {
      userId: user.id,
    },
  });
  if (profile) {
    return profile;
  }

  const newProfile = await db.profile.create({
    data: {
      userId: user.id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.emailAddresses[0].emailAddress,
      imageUrl: user.imageUrl,
    },
  });
  return newProfile;
};

export const createUserServer = async (
  profileId: string,
  name: string,
  imageUrl: string
) => {
  const server = await db.server.create({
    data: {
      profileId: profileId,
      name,
      imageUrl,
      inviteCode: uuidv4(),
      channels: {
        create: [
          {
            name: "general",
            profileId: profileId,
          },
        ],
      },
      members: {
        create: [
          {
            profileId: profileId,
            role: "ADMIN",
          },
        ],
      },
    },
  });
  return server;
};

export const findServer = async () => {
  const profile = await loadProfile();

  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  return server;
};

export const currentProfile = async () => {
  const { userId } = auth();
  if (!userId) {
    return null;
  }

  const profile = await db.profile.findUnique({
    where: {
      userId,
    },
  });

  return profile;
};

export const findAllUserServers = async (profileId: string) => {
  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId,
        },
      },
    },
  });
  return servers;
};

export const findServerFromServerId = async (serverId: string) => {
  const profile = await currentProfile();
  if (!profile) {
    return null;
  }

  const server = await db.server.findUnique({
    where: {
      id: serverId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
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
  return server;
};

export const updateServerInviteCode = async (
  serverId: string,
  profileId: string
) => {
  return await db.server.update({
    where: {
      id: serverId,
      profileId: profileId,
    },
    data: {
      inviteCode: uuidv4(),
      updatedAt: new Date(),
    },
  });
};

export const updateServer = async (serverId: string, values: FormValues) => {
  return await db.server.update({
    where: {
      id: serverId,
    },
    data: {
      name: values.name,
      imageUrl: values.imageUrl,
    },
  });
};

export const existingServer = async (inviteCode: string, profileId: string) => {
  const server = await db.server.findFirst({
    where: {
      inviteCode,
      members: {
        some: {
          profileId: profileId,
        },
      },
    },
  });

  return server;
};

export const joinMemberToServer = async (
  inviteCode: string,
  profileId: string
) => {
  const server = await db.server.update({
    where: {
      inviteCode,
    },
    data: {
      members: {
        create: [
          {
            profileId,
          },
        ],
      },
    },
  });
  return server;
};
