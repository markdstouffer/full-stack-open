import anecdoteService from '../services/anecdotes'


export const likeAnecdote = (anecdote) => {
  return async dispatch => {
    const newObj = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    const updatedAnecdote = await anecdoteService.updateAnecdote(newObj)
    dispatch({
      type: 'LIKE',
      data: updatedAnecdote
    })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createAnecdote(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'LIKE':
      const id = action.data.id
      const anecdoteToLike = state.find(n => n.id === id)
      const likedAnecdote = {
        ...anecdoteToLike,
        votes: anecdoteToLike.votes + 1
    }
      return state.map(anecdote => anecdote.id !== id ? anecdote : likedAnecdote).sort((a, b) => (a.votes < b.votes) ? 1 : -1)
    case 'INIT_ANECDOTES':
      return action.data
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    default:
        return state
  }
}

export default anecdoteReducer