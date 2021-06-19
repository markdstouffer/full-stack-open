//REACT
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom'
//REDUCERS
import { initializeBlogs } from './reducers/blogReducer'
import { setUser, loginUser } from './reducers/userReducer'
import { getUsers } from './reducers/usersReducer'
//COMPONENTS
import Login from './components/Login'
import BlogList from './components/BlogList'
import BlogPage from './components/BlogPage'
import Header from './components/Header'
import Users from './components/Users'
import User from './components/User'
import ToggleBlogForm from './components/ToggleBlogForm'
import Notification from './components/Notification'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)
  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(getUsers())
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

  const padding = {
    padding: 7
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
    <Router>
      <div>
        <Link style={padding} to="/">blogs</Link>
        <Link style={padding} to="/users">users</Link>
        <Header />
      </div>
      <Notification />
      <h1>blog app</h1>
      <Switch>
        <Route path="/blogs/:id">
          <BlogPage blogs={blogs}/>
        </Route>
        <Route path="/users/:id">
          <User users={users}/>
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/">
          <ToggleBlogForm />
          <BlogList />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
