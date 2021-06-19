import React from 'react'
import { useParams } from 'react-router'

const User = ({ users }) => {
  if (users === null) {
    return null
  }
  const user = users.find(user => user.id === useParams().id)
  if (!user) {
    return null
  }
  const blogs = user.blogs
  const renderBlogs = () => {
    if (blogs.length !== 0) {
      return (
        <div>
          {blogs.map(blog =>
            <li key={blog.id}>
              {blog.title}
            </li>
          )}
        </div>
      )
    }
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <h2>added blogs</h2>
      <ul>
        {renderBlogs()}
      </ul>
    </div>
  )
}

export default User