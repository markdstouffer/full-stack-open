/* eslint-disable no-unused-vars */
import blogService from '../services/blogs'
import loginService from '../services/login'
import { notificationChangeBad, notificationChangeGood } from './notificationReducer'

const userReducer = (state = null, action) => {
  switch (action.type) {
  case 'SET_USER': {
    const user = action.data
    blogService.setToken(user.token)
    return user
  }
  case 'LOG_OUT':
    return null
  default:
    return state
  }
}

export const loginUser = (userDetails) => {
  return async dispatch => {
    try {
      const user = await loginService.login(userDetails)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      dispatch({
        type: 'SET_USER',
        data: user
      })
      dispatch(notificationChangeGood(`Welcome, ${user.name}`, 5))
    } catch (e) {
      dispatch(notificationChangeBad('Wrong username or password', 5))
    }

  }
}

export const setUser = (user) => {
  return async dispatch => {
    dispatch({
      type: 'SET_USER',
      data: user
    })
  }
}

export const logOut = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch({
      type: 'LOG_OUT'
    })
  }
}

export default userReducer
