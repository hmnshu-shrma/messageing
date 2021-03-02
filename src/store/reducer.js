const initialState = {
  messages: []
}

function rootReducer(state = initialState, action) {
  if (action.type === 'UPDATE_DATA') {
    return Object.assign({}, state, {
      messages: state.messages.concat(action.payload)
    })
  }
  return state
}

export default rootReducer
