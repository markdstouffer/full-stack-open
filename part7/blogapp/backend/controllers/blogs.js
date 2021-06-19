const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const { body } = request

  const { user } = request

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  const returnBlog = await Blog
    .find(blog).populate('user', { username: 1, name: 1 })
  response.status(201).json(returnBlog)
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const { body } = request
  const blog = await Blog.findById(request.params.id)
  blog.comments = blog.comments.concat(body.content)
  blog.save()
  response.json(blog.comments)
})

blogsRouter.get('/:id/comments', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  response.json(blog.comments)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const { user } = request
  const blogToRemove = await Blog.findById(request.params.id)
  if (blogToRemove.user.toString() === user._id.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    return response.status(401).json({ error: 'wrong user token' })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const { body } = request
  const updatedBlog = ({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  })

  await Blog.findByIdAndUpdate(request.params.id, updatedBlog, { new: true })
  response.json(updatedBlog)
})

module.exports = blogsRouter
