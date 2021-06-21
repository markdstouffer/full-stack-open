import React from 'react'
import { useSelector } from 'react-redux'
import Blog from './Blog'
import { Table } from 'react-bootstrap'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)

  return (
    <div id="allBlogs">
      <Table striped>
        <tbody>
          {blogs.map((blog, index) =>
            <tr key={index}>
              <td>
                <Blog key={blog.id} blog={blog} />
              </td>
              <td>
                posted by {blog.user.username}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}


export default BlogList