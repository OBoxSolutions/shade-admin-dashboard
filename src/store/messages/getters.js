export const getAllMessages = (state) => {
    return state.messages
}
export const isFiltered = (state) => {
    return state.filtered
}
export const getFilterData = (state) => {
    return state.filterData
}
//Get current page in pagination
export const getCurrentPage = (state) => {
    return state.messages.meta.current_page
}