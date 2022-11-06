import adminApi from "./admin";

export async function getHiringRequests() {
  const chatMeetings = await adminApi.get("hiring-requests");
  return chatMeetings;
}

export async function deleteHiringRequest(id) {
  const chatMeetings = await adminApi.delete(`hiring-requests/${id}`);
  return chatMeetings;
}
