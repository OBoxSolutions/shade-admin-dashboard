import adminApi from "./admin";

export async function getVideoMeetings() {
  const chatMeetings = await adminApi.get("voice-meetings");
  return chatMeetings;
}
