import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notificationChange, clearNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const NewAnecdote = (props) => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        const newAnecdote = await anecdoteService.createAnecdote(content)
        dispatch(createAnecdote(newAnecdote))
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