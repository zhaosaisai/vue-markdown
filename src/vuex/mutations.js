export default {
  'UPDATE_STATUS' (state, newStatus) {
    let status = Object.assign(JSON.parse(JSON.stringify(state.status)), newStatus)
    state.status = status
  },
  'UPDATE_INPUT_VALUE' (state, value) {
    console.log(value)
    state.inputValue = value
  },
  'UPDATE_RENDER' (state, value) {
    state.render = value
  }
}
