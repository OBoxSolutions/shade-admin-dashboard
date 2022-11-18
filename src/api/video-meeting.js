import adminApi from "./admin";

export async function getVideoMeetings() {
  const chatMeetings = await adminApi.get("voice-meetings");
  return chatMeetings;
}

// Delete a video meeting
export async function deleteVideoMeeting(id) {
  const videoMeetingResponse = await (
    await adminApi.delete(`voice-meetings/${id}`)
  ).data;

  return videoMeetingResponse;
}
