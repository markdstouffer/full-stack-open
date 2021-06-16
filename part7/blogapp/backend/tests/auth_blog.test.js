const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map((blog) => new Blog(blog))
  const promiseArray = blogObjects.map((blog) => blog.save())
  await Promise.all(promiseArray)

  const passwordHash1 = await bcrypt.hash('markpass', 10)
  const user1 = new User({ username: 'himarks', name: 'Mark Stouffer', password: passwordHash1 })
  await user1.save()
  const passwordHash2 = await bcrypt.hash('someonepass', 10)
  const user2 = new User({ username: 'someone', name: 'Some One', password: passwordHash2 })
  await user2.save()
})

test('blog can be posted with proper authentication', async () => {
  const user = await User.findOne({ username: 'himarks' })
  const userForToken = {
    username: user.username,
    id: user._id
  }
  const token = jwt.sign(
    userForToken,
    process.env.SECRET,
    { expiresIn: 60 * 60 }
  )

  const newBlog = {
    title: 'Mark\'s new blog',
    author: 'Mark Stouffer',
    url: 'mark.com',
    likes: 5000
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
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

test('post fails without authentication', async () => {
  const newBlog = {
    title: 'Mark\'s new blog',
    author: 'Mark Stouffer',
    url: 'mark.com',
    likes: 5000
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)
    .expect('Content-Type', /application\/json/)

  const blogsAfter = await helper.blogsInDb()
  expect(blogsAfter).toHaveLength(helper.initialBlogs.length)
})

afterAll(() => {
  mongoose.connection.close()
})
