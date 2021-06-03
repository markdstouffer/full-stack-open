export const likeAnecdote = (id) => {
  return {
    type: 'LIKE',
    data: { id }
  }
}

export const createAnecdote = (data) => {
  return {
    type: 'NEW_ANECDOTE',
    data: {
      content: data.content,
      votes: 0
    }
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes
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