const notificationReducer = (state = null, action) => {
  switch (action.type) {
  case 'SET_NOTI':
    return action
  default:
    return state
  }
}

let timeoutID
export const notificationChangeGood = (notification, seconds) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTI',
      notification,
      sec: 'good'
    })
    clearTimeout(timeoutID)
    timeoutID = setTimeout(() => {
      dispatch({
        type: 'SET_NOTI',
        notification: null,
        sec: null
      })
    }, seconds*1000)
  }
}

export const notificationChangeBad = (notification, seconds) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTI',
      notification,
      sec: 'bad'
    })
    clearTimeout(timeoutID)
    timeoutID = setTimeout(() => {
      dispatch({
        type: 'SET_NOTI',
        notification: null,
        sec: null
      })
    }, seconds*1000)
  }
}

export default notificationReducer
