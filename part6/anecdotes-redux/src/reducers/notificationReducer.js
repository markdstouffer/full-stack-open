const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    default:
      return state
  }
}

let timeoutID
export const notificationChange = (notification, seconds) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification
    })
    clearTimeout(timeoutID)
    timeoutID = setTimeout(() => {
      dispatch({
        type: 'SET_NOTIFICATION',
        notification: ''
      })
    }, seconds*1000)
  }
}

export default notificationReducer