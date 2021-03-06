import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: '', author: '', url: ''
  })

  const handleBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url
    })
    setNewBlog({ title: '', author: '', url: '' })
  }

  return (
    <form onSubmit={handleBlog}>
      <div>
        title:
        <input
          id="title"
          type="text"
          value={newBlog.title}
          name="Title"
          onChange={({ target }) => {
            const newTitle = {
              ...newBlog,
              title: target.value
            }
            setNewBlog(newTitle)
          }}
        />
      </div>
      <div>
        author:
        <input
          id="author"
          type="text"
          value={newBlog.author}
          name="Author"
          onChange={({ target }) => {
            const newAuthor = {
              ...newBlog,
              author: target.value
            }
            setNewBlog(newAuthor)
          }}
        />
      </div>
      <div>
        url:
        <input
          id="url"
          type="text"
          value={newBlog.url}
          name="url"
          onChange={({ target }) => {
            const newUrl = {
              ...newBlog,
              url: target.value
            }
            setNewBlog(newUrl)
          }}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default BlogForm
