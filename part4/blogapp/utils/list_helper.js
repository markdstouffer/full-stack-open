// eslint-disable-next-line import/no-extraneous-dependencies
const _ = require('lodash')

const dummy = (blogs) => 1

const totalLikes = (blogs) => {
  let tot = 0
  blogs.forEach((blog) => {
    tot += blog.likes
  })
  return tot
}

const favoriteBlog = (blogs) => {
  // eslint-disable-next-line prefer-spread
  const max = Math.max.apply(Math, blogs.map((o) => o.likes))
  return blogs.find((x) => x.likes === max)
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }
  const authBlogs = _(blogs)
    .groupBy('author')
    .map((blogPosts, author) => ({
      author,
      blogs: blogPosts.length
    }))
    .value()

  const mostAuthBlogs = _.maxBy(authBlogs, 'blogs')
  return mostAuthBlogs
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }
  const authBlogs = _(blogs)
    .groupBy('author')
    .map((blogPosts, author) => ({
      author,
      likes: _.sumBy(blogPosts, 'likes')
    }))
    .value()

  const mostAuthLikes = _.maxBy(authBlogs, 'likes')

  return mostAuthLikes
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
