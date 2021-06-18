/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import ToggleBlogForm from './components/ToggleBlogForm'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { setUser, loginUser } from './reducers/userReducer'
import Login from './components/Login'
import BlogList from './components/BlogList'
import Header from './components/Header'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const userJSON = window.localStorage.getItem('loggedBlogappUser')
    if (userJSON) {
      const u = JSON.parse(userJSON)
      dispatch(setUser(u))
    }
  }, [dispatch])

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(loginUser({ username, password }))
    setUsername('')
    setPassword('')
  }

  if (user === null) {
    return (
      <div>
        <Notification />
        <Login
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      </div>
    )
  }

  return (
    <div>
      <Notification />
      <Header />
      <ToggleBlogForm />
      <BlogList />
    </div>
  )
}

export default App
