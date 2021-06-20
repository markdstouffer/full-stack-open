/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types'
import {
  Link
} from 'react-router-dom'

const Blog = (props) => {

  return (
    <div id="oneBlog">
      <Link to={`/blogs/${props.blog.id}`}>{props.blog.title}</Link>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

export default Blog