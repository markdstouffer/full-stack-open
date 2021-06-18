import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './Blog'
import BlogFull from './BlogFull'

const BlogList = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  const removeBlog = async (id) => {
    const foundBlog = blogs.find(x => x.id === id)
    if (window.confirm(`Remove ${foundBlog.title} by ${foundBlog.author}?`)) {
      dispatch(removeBlog(id))
    }
  }

  return (
    <div id="allBlogs">
      {blogs.map(blog => {
        return (
          <Blog
            user={user}
            removeBlog={removeBlog}
            key={blog.id}
            blog={blog}
            buttonLabel='show'>
            <BlogFull blog={blog}/>
          </Blog>
        )
      }
      )}
    </div>
  )
}


export default BlogList