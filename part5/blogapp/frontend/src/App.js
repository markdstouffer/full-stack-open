import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import BlogFull from './components/BlogFull'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [doneMessage, setDoneMessage] = useState(null)
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort((a, b) => b.likes - a.likes)))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const timeMessage = () => {
    const today = new Date()
    const currentHour = today.getHours()
    var response = ''
    if (currentHour < 12 && currentHour > 4) {
      response = 'Good morning'
    } else if (currentHour < 19 && currentHour > 12) {
      response = 'Good afternoon'
    } else {
      response = 'Good evening'
    }
    return response
  }

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
      setDoneMessage(`${timeMessage()}, ${user.name}`)
      setTimeout(() => {
        setDoneMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    setDoneMessage('Logging out')
    setTimeout(() => {
      setDoneMessage(null)
    }, 5000)
  }

  const addBlog = async (blogObject) => {
    const postedBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(postedBlog))
    setDoneMessage(`a new blog ${blogObject.title} by ${blogObject.author} added`)
    setTimeout(() => {
      setDoneMessage(null)
    }, 5000)
  }

  const updateLikes = async (blogObject) => {
    await blogService.update(blogObject)
    const updatedBlogs = blogs.map(x => x.id !== blogObject.id ? x : blogObject)
    setBlogs(updatedBlogs.sort((a, b) => b.likes - a.likes))
  }

  const removeBlog = async (id) => {
    const foundBlog = blogs.find(x => x.id === id)
    if (window.confirm(`Remove ${foundBlog.title} by ${foundBlog.author}?`)) {
      await blogService.remove(id)
      setBlogs(blogs.filter(x => x.id !== id))
    }
  }

  const BadNoti = ({ message }) => {
    if (message === null) {
      return null
    }
    return (
      <div className="error">
        {message}
      </div>
    )
  }
  const GoodNoti = ({ message }) => {
    if (message === null) {
      return null
    }
    return (
      <div className="done">
        {message}
      </div>
    )
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
          <BlogFull blog={blog} updateBlog={updateLikes}/>
        </Blog>
      )}
    </div>
  )

  if (user === null) {
    return (
      <div>
        <GoodNoti message={doneMessage} />
        <BadNoti message={errorMessage} />
        <h2>Log in to application</h2>
        {loginForm()}
      </div>
    )
  }
  return (
    <div>
      <GoodNoti message={doneMessage} />
      <BadNoti message={errorMessage} />
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