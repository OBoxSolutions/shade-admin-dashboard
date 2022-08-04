export const authenticated = (state) => {
    return state.token && state.user ? true : false
}

export const user = (state) => {
    return state.user
}