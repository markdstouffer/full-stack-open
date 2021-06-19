/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types'
import {
  Link
} from 'react-router-dom'

const Blog = (props) => {
  const hideWhenVisible = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return (
    <div id="oneBlog">
      <div style={hideWhenVisible}>
        <Link to={`/blogs/${props.blog.id}`}>{props.blog.title}</Link>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

export default Blog