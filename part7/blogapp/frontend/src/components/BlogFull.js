import React from 'react'
import { useDispatch } from 'react-redux'
import { likeBlog } from '../reducers/blogReducer'
import { notificationChangeGood } from '../reducers/notificationReducer'

const BlogFull = ({ blog }) => {
  const dispatch = useDispatch()

  const handleLikes = (event) => {
    event.preventDefault()
    dispatch(likeBlog(blog))
    dispatch(notificationChangeGood(`You liked '${blog.title}'`, 5))
  }


  return (
    <div>
      <u>Title:</u> <b>{blog.title}</b> <br />
      <u>URL:</u> <a href={blog.url}>{blog.url}</a> <br />
      <u>Likes:</u> <span className="likesSpan">{blog.likes}</span>
      <button id="likeButton" onClick={handleLikes}>like</button> <br />
      <u>Posted by:</u> <i>{blog.author}</i>
    </div>
  )
}
export default BlogFull