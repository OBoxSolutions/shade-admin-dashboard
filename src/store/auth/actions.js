import adminApi from "@/api/admin";

//Login user
export const login = async ({ dispatch }, loginData) => {
  const { data } = await adminApi.post("/login", loginData)

  const { status } = data

  if (status === 1){
    await dispatch("attempt", data.access_token)
  }
  return data
}

export const attempt = async ({ commit, state }, token) => {
  if(token){
    await commit("setToken", token)
  }
  if(!state.token){
    return
  }

  try {
    const { data } = await adminApi.get("/user-profile", {
      headers: {
        'Authorization': 'Bearer ' + token
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
}