import adminApi from "@/api/admin";

//Get all the messages with server-side pagination
export const loadAllMessages = async ({ commit }, pageNumber) => {
  const { data } = await adminApi.get("/messages");

  commit("setFiltered", false);
  commit("setAllMessages", data);
};

//Get specific message
export const loadMessage = async ({ commit }, message) => {
  const { data } = await adminApi.get(`/messages/${message}`);

  commit("setMessage", data);
};

//Delete specific message
export const deleteMessage = async (_, message) => {
  const { data } = await adminApi.delete(`/messages/${message}`);
  return data;
};

//Filter messages
export const filterMessages = async (
  { commit },
  { category, value, pageNumber }
) => {
  const { data } = await adminApi.post("/messages/filter?page=" + pageNumber, {
    category,
    value,
  });

  commit("setFilterData", { category, value, pageNumber });
  commit("setFiltered", true);
  commit("setAllMessages", data);
};
