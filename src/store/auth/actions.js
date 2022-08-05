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
    commit("setToken", token)
  }
  if(!state.token){
    return
  }

  adminApi.defaults.headers.common['Authorization'] = `Bearer ${token}`
  
  try {
    const { data } = await adminApi.get("/user-profile", {
      // headers: {
        //   'Authorization': 'Bearer ' + token
        // }
      })

    localStorage.setItem('token', token)
    commit("setUser", data)
    
  } catch (error) {
    commit("setToken", null)
    commit("setUser", null)
  }
}

//Logout current user
export const logout = async ({ commit }) => {
  const { data } = await adminApi.get("/logout", {
    // headers: {
    //   'Authorization': 'Bearer ' + state.token
    // }
  });

  if (data.status === 1){
    commit("setToken", null)
    commit("setUser", null)

    adminApi.defaults.headers.common['Authorization'] = null
    localStorage.removeItem('token')

    return true
  }
  else{
    return false
  }
}