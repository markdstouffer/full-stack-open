//REACT
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom'
//SERVICES
import signupService from './services/signup'
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
import Signup from './components/Signup'
//STYLING LIBRARY
import { Navbar, Nav } from 'react-bootstrap'

const App = () => {
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)
  const blogs = useSelector(state => state.blogs)
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(getUsers())
    const userJSON = window.localStorage.getItem('loggedBlogappUser')
    if (userJSON) {
      const u = JSON.parse(userJSON)
      dispatch(setUser(u))
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(loginUser({ username, password }))
    setUsername('')
    setPassword('')
  }

  const handleSignup = async (event) => {
    event.preventDefault()
    const newUserDetails = {
      username: username,
      password: password,
      name: name
    }
    await signupService.signup(newUserDetails)
    setUsername('')
    setPassword('')
    setName('')
  }

  const padding = {
    padding: 7
  }

  if (user === null) {
    return (
      <div>
        <Router>
          <Notification />
          <Switch>
            <Route path="/signup">
              <Signup
                username={username}
                password={password}
                name={name}
                setUsername={setUsername}
                setPassword={setPassword}
                setName={setName}
                handleSignup={handleSignup}
              />
            </Route>
            <Route path="/">
              <Login
                username={username}
                password={password}
                setUsername={setUsername}
                setPassword={setPassword}
                handleLogin={handleLogin}
              />
            </Route>
          </Switch>
        </Router>
      </div>
    )
  }

  return (
    <div className="container">
      <Router>
        <div>
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="#" as="span">
                  <Link style={padding} to="/">blogs</Link>
                </Nav.Link>
                <Nav.Link href="#" as="span">
                  <Link style={padding} to="/users">users</Link>
                </Nav.Link>
                <Nav.Link href="#" as="span">
                  <Header />
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
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
    </div>
  )
}

export default App
