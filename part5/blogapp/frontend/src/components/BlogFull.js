import React from 'react'

const BlogFull = ({ blog, updateBlog }) => {

  const handleLikes = (event) => {
    event.preventDefault()
    updateBlog({
      ...blog,
      likes: blog.likes + 1
    })
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