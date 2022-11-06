import adminApi from "./admin";

export async function getHiringRequests() {
  const chatMeetings = await adminApi.get("hiring-requests");
  return chatMeetings;
}

export async function deleteHiringRequests(id) {
  const chatMeetings = await adminApi.delete(`hiring-requests/${id}`);
  return chatMeetings;
}
