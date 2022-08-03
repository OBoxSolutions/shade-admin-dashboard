//Set token
export const setToken = (state, token) => {
  state.token = token
}
  //Set token
  export const setUser = (state, user) => {
    state.user = user
  }
  
  //Set messages
  export const setAllMessages = (state, messages) => {
    state.messages = [...messages];
  };