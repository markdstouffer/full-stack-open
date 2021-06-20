import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { notificationChangeGood } from '../reducers/notificationReducer'
import { logOut } from '../reducers/userReducer'
import { Button } from 'react-bootstrap'

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
    <div>
      <em style={{ paddingRight: '10px' }}>{user.name} logged in</em>
      <Button variant="outline-danger" size="sm" type="submit" onClick={handleLogout}>logout</Button>
    </div>
  )
}

export default Header