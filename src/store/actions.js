import adminApi from "@/api/admin";

//Login user
export const login = async ({ dispatch }, loginData) => {
  const { data } = await adminApi.post("/login", loginData)

  const { status } = data

  if (status === 1){
    dispatch("attempt", data)
  }
  return data
}

export const attempt = async ({ commit }, userData) => {
  const { access_token } = userData
  commit("setToken", access_token)

  try {
    const { data } = await adminApi.get("/user-profile", {
      headers: {
        'Authorization': 'Bearer ' + access_token
      }
    })
    commit("setUser", data)

    return data

  } catch (error) {
    commit("setToken", null)
    commit("setUser", null)
  }
}

//Logout current user
export const logout = async ({ commit }) => {
  const { data } = await adminApi.get("/logout");

  if (status === 1)
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
