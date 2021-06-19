import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { notificationChangeGood } from '../reducers/notificationReducer'
import { logOut } from '../reducers/userReducer'

const Header = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(logOut())
    dispatch(notificationChangeGood('Logging out', 5))
  }

  return (
    <em>{user.name} logged in
      <button id="logoutButton" type="submit" onClick={handleLogout}>logout</button>
      <br /><br />
    </em>
  )
}

export default Header