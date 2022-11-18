import adminApi from "./admin";

export async function getChatMeetings() {
  const chatMeetings = await adminApi.get("chat-meetings");
  return chatMeetings;
}

export async function deleteChatMeeting(id) {
  const response = await (await adminApi.delete(`chat-meetings/${id}`)).data;
  return response;
}
