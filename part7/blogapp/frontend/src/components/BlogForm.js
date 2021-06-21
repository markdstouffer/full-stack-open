import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { notificationChangeGood } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'
import { Form, Button } from 'react-bootstrap'

const BlogForm = () => {
  const [newBlog, setNewBlog] = useState({
    title: '', author: '', url: ''
  })
  const dispatch = useDispatch()
  const addBlog = async (blogObject) => {
    dispatch(createBlog(blogObject))
  }

  const handleBlog = (event) => {
    event.preventDefault()
    addBlog({
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url
    })
    setNewBlog({ title: '', author: '', url: '' })
    dispatch(notificationChangeGood(`a new blog ${newBlog.title} added`, 5))

  }

  return (
    <Form onSubmit={handleBlog}>
      <Form.Group>
        <Form.Label>title:</Form.Label>
        <Form.Control
          value={newBlog.title}
          onChange={({ target }) => {
            const newTitle = {
              ...newBlog,
              title: target.value
            }
            setNewBlog(newTitle)
          }}
        />
        <Form.Label>content:</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          value={newBlog.author}
          onChange={({ target }) => {
            const newAuthor = {
              ...newBlog,
              author: target.value
            }
            setNewBlog(newAuthor)
          }}
        />
        <Form.Label>url:</Form.Label>
        <Form.Control
          value={newBlog.url}
          onChange={({ target }) => {
            const newUrl = {
              ...newBlog,
              url: target.value
            }
            setNewBlog(newUrl)
          }}
        />
      </Form.Group>
      <Button id="submitgrp" variant="primary" type="submit">create</Button>
    </Form>
  )
}

export default BlogForm
