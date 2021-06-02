import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notificationChange, clearNotification } from '../reducers/notificationReducer'

const NewAnecdote = (props) => {
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content))
        dispatch(notificationChange(`new anecdote added '${content}'`))
        setTimeout(() => {
            dispatch(clearNotification())
        }, 5000)
    }

    return (
        <div>
        <h2>create new</h2>
        <form onSubmit={addAnecdote}>
          <input name="anecdote"/>
          <button type="submit">create</button>
        </form>
        </div>
    )
}

export default NewAnecdote