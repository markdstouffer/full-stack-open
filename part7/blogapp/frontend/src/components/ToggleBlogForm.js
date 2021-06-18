import React from 'react'
import Togglable from './Togglable'
import BlogForm from './BlogForm'

const ToggleBlogForm = () => (
  <div>
    <Togglable buttonLabel='create blog'>
      <h2>create new</h2>
      <BlogForm />
    </Togglable>
  </div>
)

export default ToggleBlogForm