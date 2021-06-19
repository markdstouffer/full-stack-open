/* eslint-disable no-case-declarations */
import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_BLOGS':
    return action.data
  case 'CREATE_BLOG':
    return [...state, action.data]
  case 'LIKE_BLOG':
    const id = action.data.id
    const blogToLike = state.find(n => n.id === id)
    const likedBlog = {
      ...blogToLike,
      likes: blogToLike.likes + 1
    }
    return state.map(blog => blog.id !== id ? blog : likedBlog).sort((a, b) => b.likes - a.likes)
  case 'REMOVE_BLOG':
    const idToRemove = action.data
    return state.filter(blog => blog.id !== idToRemove)
  default:
    return state
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    const newObj = {
      ...blog,
      likes: blog.likes + 1
    }
    const updatedBlog = await blogService.update(newObj)
    dispatch({
      type: 'LIKE_BLOG',
      data: {
        blog: updatedBlog,
        id: newObj.id
      }
    })
  }
}

export const removeBlog = (id) => {
  blogService.remove(id)
  return {
    type: 'REMOVE_BLOG',
    data: id
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    const sorted = blogs.sort((a, b) => b.likes - a.likes)
    dispatch({
      type: 'INIT_BLOGS',
      data: sorted
    })
  }
}

export const createBlog = (obj) => {
  return async dispatch => {
    const postedBlog = await blogService.create(obj)
    dispatch({
      type: 'CREATE_BLOG',
      data: postedBlog[0]
    })
  }
}

export default blogReducer