import adminApi from "./admin";

export async function getHiringRequests() {
  const chatMeetings = await adminApi.get("hiring-requests");
  return chatMeetings;
}

export async function deleteHiringRequest(id) {
  const response = await adminApi.delete(`hiring-requests/${id}`);

  return response.data;
}
