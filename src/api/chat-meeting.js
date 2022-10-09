import adminApi from "./admin";

export async function getChatMeetings() {
  const chatMeetings = await adminApi.get("chat-meetings");
  return chatMeetings;
}
