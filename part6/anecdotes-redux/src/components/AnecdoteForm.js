import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notificationChange } from '../reducers/notificationReducer'

const NewAnecdote = (props) => {

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        props.createAnecdote(content)
        props.notificationChange(`new anecdote added '${content}'`, 10)
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

const mapDispatchToProps = {
    createAnecdote,
    notificationChange
} 

const ConnectedNewAnecdote = connect(
    null,
    mapDispatchToProps
)(NewAnecdote)

export default ConnectedNewAnecdote