import adminApi from "./admin";

export async function getHiringRequests() {
  const chatMeetings = await adminApi.get("hiring-requests");
  return chatMeetings;
}
