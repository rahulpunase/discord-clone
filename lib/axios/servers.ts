import { FormValues } from "@/app/(setup)/InitialModal";
import { Server } from "@prisma/client";
import axios from "axios";

const createServer = async (values: FormValues) => {
  try {
    const response = await axios.post("/api/servers", values);
    return response.data;
  } catch (e) {
    console.log("Error");
    return null;
  }
};

const getNewInviteCode = async (serverId: string): Promise<Server | null> => {
  try {
    const response = await axios.patch<Server>(
      `/api/servers/${serverId}/invite-code`
    );
    return response.data;
  } catch (e) {
    return null;
  }
};

const updateServerData = async (serverId: string, values: FormValues) => {
  try {
    const response = await axios.patch(`/api/servers/${serverId}`, values);
    return response.data;
  } catch (e) {
    console.log("Error");
    return null;
  }
};

export { createServer, getNewInviteCode, updateServerData };
