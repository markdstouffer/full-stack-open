import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<BlogForm /> updates form correctly', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const inputAuth = component.container.querySelector('#author')
  const inputTitle = component.container.querySelector('#title')
  const inputUrl = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(inputTitle, {
    target: { value: 'A cool new blog post' }
  })
  fireEvent.change(inputAuth, {
    target: { value: 'Mark Stouffer' }
  })
  fireEvent.change(inputUrl, {
    target: { value: 'mark.com' }
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('A cool new blog post')
  expect(createBlog.mock.calls[0][0].author).toBe('Mark Stouffer')
  expect(createBlog.mock.calls[0][0].url).toBe('mark.com')
})