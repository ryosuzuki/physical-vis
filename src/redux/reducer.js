
let reducer = function (state, action) {
  switch (action.type) {
    case 'INIT_STATE':
      return Object.assign({}, state,
        action.state
      )
    case 'UPDATE_DATA':
      return Object.assign({}, state, {
        data: action.data
      })
    default:
      return state
  }
}

export default reducer