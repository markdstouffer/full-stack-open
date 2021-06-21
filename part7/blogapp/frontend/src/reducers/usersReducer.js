import userService from '../services/users'

const usersReducer = (state = null, action) => {
  switch (action.type) {
  case 'GET_USER':
    return action.data
  default:
    return state
  }
}

export const getUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type: 'GET_USER',
      data: users
    })
  }
}

export default usersReducer