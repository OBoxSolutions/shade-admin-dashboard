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
    const { data } = await adminApi.get("/user-profile")
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
}