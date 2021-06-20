/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'

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
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </li>
          )}
        </div>
      )
    }
  }

  return (
    <div>
      <h3>user: {user.name}'s added blogs</h3>
      <ul>
        {renderBlogs()}
      </ul>
    </div>
  )
}

export default User