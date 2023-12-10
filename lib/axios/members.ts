import { MemberRole } from "@prisma/client";
import axios from "axios";

export const updateMemberRole = async (url: string, role: MemberRole) => {
  try {
    const response = await axios.patch(url, {
      role,
    });
    return response.data;
  } catch (e) {
    return null;
  }
};

export const kickMemberFromServer = async (url: string) => {
  try {
    const response = await axios.delete(url, {});
    return response.data;
  } catch (e) {
    return null;
  }
};
