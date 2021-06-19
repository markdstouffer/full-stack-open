import React from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import { likeBlog } from '../reducers/blogReducer'
import { notificationChangeGood } from '../reducers/notificationReducer'

const BlogPage = ({ blogs }) => {
  const blog = blogs.find(blog => blog.id === useParams().id)

  if (!blog) {
    return null
  }

  const dispatch = useDispatch()

  const handleLikes = (event) => {
    event.preventDefault()
    dispatch(likeBlog(blog))
    dispatch(notificationChangeGood(`You liked '${blog.title}'`, 5))
  }
  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a> <br />
      {blog.likes} likes
      <button onClick={handleLikes}>like</button> <br />
      added by {blog.user.name}
    </div>
  )
}

export default BlogPage