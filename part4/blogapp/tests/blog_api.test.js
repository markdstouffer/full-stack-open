const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map((blog) => new Blog(blog))
  const promiseArray = blogObjects.map((blog) => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned in JSON', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('id, not _id', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const aBlog = blogsAtStart[0]
  expect(aBlog.id).toBeDefined()
})

test('blog can be posted', async () => {
  const newBlog = {
    title: 'Mark\'s new blog',
    author: 'Mark Stouffer',
    url: 'mark.com',
    likes: 5000
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAfter = await helper.blogsInDb()
  expect(blogsAfter).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAfter.map((r) => r.title)
  expect(titles).toContain(
    'Mark\'s new blog',
  )
})

test('blog with no likes', async () => {
  const newBlog = {
    title: 'This has no likes!',
    author: 'Mark Stouffer',
    url: 'mark.com'
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)

  const newBlogPos = helper.initialBlogs.length
  const blogsAfter = await helper.blogsInDb()
  expect(blogsAfter[newBlogPos].likes).toBe(0)
})

test('blog with no title or url', async () => {
  const newBlog = {
    author: 'Mark Stouffer',
    likes: 500
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('single blog can be deleted', async () => {
  const beforeBlogs = await helper.blogsInDb()
  const blogToDelete = beforeBlogs[0]
  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const afterBlogs = await helper.blogsInDb()
  expect(afterBlogs.length).toBe(helper.initialBlogs.length - 1)

  const contentsAfter = afterBlogs.map((r) => r.title)
  expect(contentsAfter).not.toContain(blogToDelete.title)
})

test('a blog can be updated', async () => {
  const beforeBlogs = await helper.blogsInDb()
  const blogToUpdate = beforeBlogs[0]
  const updatedBlog = {
    ...blogToUpdate,
    likes: blogToUpdate.likes + 1
  }
  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedBlog)

  const blogsAfter = await helper.blogsInDb()
  expect(blogsAfter[0].likes).toBe(blogToUpdate.likes + 1)
})

afterAll(() => {
  mongoose.connection.close()
})
