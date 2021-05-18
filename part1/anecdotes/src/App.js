import React, { useState } from 'react'

function getRandom(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min)
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   
  const [selected, setSelected] = useState({
    sel: 0, points: new Array(6).fill(0), max: 0
  })

  const chooseNum = () => {
    const randomNumber = getRandom(0,6)
    const newSel = {
      ...selected,
      sel: randomNumber
    }
    setSelected(newSel)
  }

  const updateVote = () => {
    const copy = [...selected.points]
    const current = selected.sel
    var currentMax = selected.max
    copy[current] += 1
    if (copy[current] > copy[currentMax]) {
      currentMax = current
    }
    const newPt = {
      ...selected,
      points: copy,
      max: currentMax
    }
    setSelected(newPt)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected.sel]} <br />
      has {selected.points[selected.sel]} votes <br />
      <button onClick={updateVote}>vote</button>
      <button onClick={chooseNum}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      {anecdotes[selected.max]} <br />
      has {selected.points[selected.max]} votes <br />
    </div>
  )
}

export default App