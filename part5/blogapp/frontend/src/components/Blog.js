import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = (props) => {
  const [showFull, setShowFull] = useState(false)

  const hideWhenVisible = {
    display: showFull ? 'none' : '',
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const showWhenVisible = {
    display: showFull ? '' : 'none',
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleDetails = () => {
    setShowFull(!showFull)
  }

  const handleDelete = () => {
    props.removeBlog(props.blog.id)
  }

  const showRemoveButton = () => {
    if (props.user.username === props.blog.user.username) {
      return (<button id="deleteButton" onClick={handleDelete}>remove</button>)
    }
  }

  return (
    <div id="oneBlog">
      <div style={hideWhenVisible}>
        <b>{props.blog.title}</b> by <i>{props.blog.author}</i>
        <button id="showButton" onClick={toggleDetails}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible} className='showDetails'>
        <button onClick={toggleDetails}>hide</button>
        {props.children}
        {showRemoveButton()}
      </div>
    </div>
  )
}

Blog.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  blog: PropTypes.object.isRequired
}

export default Blog