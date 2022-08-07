//Set messages
export const setAllMessages = (state, messages) => {
    state.messages = messages
}
//Set filtered status
export const setFiltered = (state, value) => {
    state.filtered = value
}
//Set filter data
export const setFilterData = (state, data) => {
    state.filterData = data
}
//Set current page for pagination
export const setCurrentPage = (state, data) => {
    state.messages.meta.current_page = data
}
