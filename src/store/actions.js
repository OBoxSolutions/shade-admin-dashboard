import adminApi from "@/api/admin";

//Login user
export const login = async ({ commit }, loginData) => {
  const { data } = await adminApi.post("/login", loginData);

  commit("loginUser", data);
};

//Logout current user
export const logout = async ({ commit }) => {
  const { data } = await adminApi.get("/logout");

  commit("logoutUser", data);
};

//Get all the messages
export const loadAllMessages = async ({ commit }) => {
  const { data } = await adminApi.get("/messages");

  commit("setAllMessages", data);
};

//Get specific message
export const loadMessage = async ({ commit }, message) => {
  const { data } = await adminApi.get(`/messages/${message}`);

  commit("setMessage", data);
};

//Delete specific message
export const deleteMessage = async ({ commit }, message) => {
  const { data } = await adminApi.delete(`/messages/${message}`);

  commit("deleteMessage", data);
};

//Filter messages
export const filter = async ({ commit }, filterData) => {
  const { data } = await adminApi.post("/filter", filterData);

  commit("setFilterMessages", data);
};
