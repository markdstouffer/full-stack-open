import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import BlogFull from './BlogFull'

describe('<Blog />', () => {
  let component
  const blog = {
    title: 'Test blog',
    author: 'Mark',
    url: 'mark.com',
    user: {
      username: 'mark'
    },
    likes: 100
  }
  const user = {
    username: 'mark'
  }
  const mockHandler = jest.fn()
  beforeEach(() => {
    component = render(
      <Blog blog={blog} user={user} buttonLabel='show'>
        <BlogFull blog={blog} updateBlog={mockHandler}/>
      </Blog>
    )
  })

  test('initially renders only title & author', () => {
    component.debug()
    expect(component.container).toHaveTextContent('Test blog')
    expect(component.container).toHaveTextContent('Mark')

    const div = component.container.querySelector('.showDetails')
    expect(div).toHaveStyle('display: none')
  })

  test('renders all details after button is clicked', () => {
    const button = component.getByText('show')
    fireEvent.click(button)
    const div = component.container.querySelector('.showDetails')
    expect(div).not.toHaveStyle('display: none')
  })

  test('clicking button twice calls handler twice', () => {
    const buttonA = component.getByText('show')
    fireEvent.click(buttonA)

    const buttonB = component.getByText('like')
    fireEvent.click(buttonB)
    fireEvent.click(buttonB)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })

})