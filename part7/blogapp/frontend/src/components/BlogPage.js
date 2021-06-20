import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import { likeBlog, commentBlog } from '../reducers/blogReducer'
import { notificationChangeGood } from '../reducers/notificationReducer'
import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

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
      <Form onSubmit={handleComment}>
        <Form.Control
          type="text"
          value={comment}
          onChange={({ target }) => { setComment(target.value) }}
        />
        <Button style={{ float: 'right' }} variant="primary" size="sm" type="submit">add comment</Button>
      </Form>
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
      <div className="page-child">
        <h2>{blog.title}</h2>
        <p>{blog.author}</p>
        <a href={blog.url}>{blog.url}</a> <br />
        {blog.likes} likes
        <Button variant="success" size="sm" onClick={handleLikes}>like</Button> <br />
        added by <Link to={`/users/${blog.user.id}`}>{blog.user.name}</Link>
      </div>
      <div className="page-child">
        <Comments blog={blog} />
      </div>
    </div>
  )
}

export default BlogPage