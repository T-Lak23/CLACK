import { StreamChat } from "stream-chat";
import { ENV } from "./env.js";
const serverClient = StreamChat.getInstance(ENV.STREAM_KEY, ENV.STREAM_SECRET);

export const upsertStreamUser = async (userData) => {
  try {
    await serverClient.upsertUser(userData);
    console.log("user upserted successfully", userData.name);
    return userData;
  } catch (error) {
    console.log("error upserting user", error);
  }
};

export const deleteStreamUser = async (userId) => {
  try {
    await serverClient.deleteUser(userId);
    console.log("user deleted successfully", userId);
  } catch (error) {
    console.log("error deleting user from stream", error);
  }
};

export const generateStreamToken = async (userId) => {
  try {
    const userIdString = userId.toString();
    const token = serverClient.createToken(userId);
    return token;
  } catch (error) {
    console.log("error generating the stream token", error);
    return null;
  }
};

export const addUserToPublicChannels = async (newUserId) => {
  const publicChannels = await streamClient.queryChannels({
    discoverable: true,
  });
  for (const channel of publicChannels) {
    await channel.addMembers(newUserId);
  }
};
