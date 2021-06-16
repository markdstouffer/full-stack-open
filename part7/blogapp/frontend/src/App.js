/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import BlogFull from './components/BlogFull'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { notificationChangeGood, notificationChangeBad } from './reducers/notificationReducer'
import { createBlog, initializeBlogs, removeBlog } from './reducers/blogReducer'

const App = () => {
  // const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])
  const blogs = useSelector(({ blogs }) => blogs)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
      blogService.setToken(user.token)
      dispatch(notificationChangeGood(`Welcome, ${user.name}`, 5))
    } catch (exception) {
      dispatch(notificationChangeBad('Wrong username or password', 5))
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    dispatch(notificationChangeGood('Logging out', 5))
  }

  const addBlog = async (blogObject) => {
    const postedBlog = await blogService.create(blogObject)
    dispatch(createBlog(postedBlog))
  }

  const removeBlog = async (id) => {
    const foundBlog = blogs.find(x => x.id === id)
    if (window.confirm(`Remove ${foundBlog.title} by ${foundBlog.author}?`)) {
      dispatch(removeBlog(id))
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id="username"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          id="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">login</button>
    </form>
  )

  const blogForm = () => (
    <Togglable buttonLabel='create blog'>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )
  const showBlogs = () => (
    <div id="allBlogs">
      {blogs.map(blog =>
        <Blog
          user={user}
          removeBlog={removeBlog}
          key={blog.id}
          blog={blog}
          buttonLabel='show'>
          <BlogFull blog={blog}/>
        </Blog>
      )}
    </div>
  )

  if (user === null) {
    return (
      <div>
        <Notification />
        <h2>Log in to application</h2>
        {loginForm()}
      </div>
    )
  }
  return (
    <div>
      <Notification />
      <h2>blogs</h2>
      <em>{user.name} logged in
        <button id="logoutButton" type="submit" onClick={handleLogout}>logout</button>
        <br /><br />
      </em>
      <h2>create new</h2>
      {blogForm()}
      {showBlogs()}
    </div>
  )
}

export default App