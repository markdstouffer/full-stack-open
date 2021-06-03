/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createAnecdote = async (content) => {
  const anecdoteObject = { content, votes: 0}
  const response = await axios.post(baseUrl, anecdoteObject)
  return response.data
}

const updateAnecdote = async (newObject) => {
  const url = `${baseUrl}/${newObject.id}`
  const response = await axios.put(url, newObject)
  return response.data
}

export default { getAll, createAnecdote, updateAnecdote }