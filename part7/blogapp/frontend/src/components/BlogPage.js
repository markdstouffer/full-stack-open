import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import { likeBlog, commentBlog } from '../reducers/blogReducer'
import { notificationChangeGood } from '../reducers/notificationReducer'

const Comments = ({ blog }) => {
  if (!blog.comments) {
    return null
  }
  const dispatch = useDispatch()
  var comments = blog.comments
  const [comment, setComment] = useState('')

  const handleComment = async (event) => {
    try {
      event.preventDefault()
      dispatch(commentBlog(blog, comment))
      dispatch(notificationChangeGood(`You commented on '${blog.title}'`, 5))
      setComment('')
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div>
      <h2>comments</h2>
      <ul>
        {comments.map((c, index) =>
          <li key={index}>
            {c}
          </li>
        )}
      </ul>
      <form onSubmit={handleComment}>
        <input
          id="comment"
          type="text"
          value={comment}
          name="Comment"
          onChange={({ target }) => {
            setComment(target.value)
          }}
        />
        <button type="submit">post</button>
      </form>
    </div>
  )
}

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
      <Comments blog={blog} />
    </div>
  )
}

export default BlogPage