import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS } from '../queries'
import { EDIT_BORN } from '../mutations'
import Select from 'react-select'

const BornForm = ({ authors }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [selectedOption, setSelectedOption] = useState(null)

  const [ changeBorn ] = useMutation(EDIT_BORN, {
    refetchQueries: [ { query: ALL_AUTHORS }, { query: ALL_BOOKS } ]
  })

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? 'red' : 'blue',
      padding: 20,
    }),
    control: () => ({
      width: 200,
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1
      const transition = 'opacity 300ms'
  
      return { ...provided, opacity, transition }
    }
  }

  const submit = (event) => {
    event.preventDefault()
    changeBorn({ variables: { name: name, setBornTo: parseInt(born, 10) } })
    setName('')
    setBorn('')
  }
  const authorsNames = authors.map(a => {
    return (
      {
        value: a.name,
        label: a.name
      }
    )
  })

  const handleSelect = (selectedOption) => {
    setSelectedOption(selectedOption)
    setName(selectedOption.label)
  }
  return (
    <div>
      <h2>Set birth-year</h2>

      <form onSubmit={submit}>
        <Select
          styles={customStyles}
          defaultValue={selectedOption}
          onChange={handleSelect}
          options={authorsNames}
        />
        <div>
          born <input
            type='number'
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>update birth-year</button>
      </form>
    </div>
  )
}

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)
  const authors = result.data
  
  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  if (authors.allAuthors) {
    return (
      <div>
        <h2>authors</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>
                born
              </th>
              <th>
                books
              </th>
            </tr>
            {authors.allAuthors.map(a =>
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            )}
          </tbody>
        </table>
        <BornForm authors={authors.allAuthors}/>
      </div>
    )
  }
}

export default Authors
