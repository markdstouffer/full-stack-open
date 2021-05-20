import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const Filter = ({filt, handle}) => (
  <div>
    filter shown with <input value={filt} onChange={handle}/>
  </div>
)

const Person = ({ person, removePerson }) => (
  <div>
    {person.name} {person.number}
    <button onClick={removePerson}>delete</button>
  </div>
)

const PersonForm = (props) => (
    <form onSubmit={props.addName}>
      <div>
        name: <input value={props.newName} onChange={props.handleNameChange}/>
      </div>
      <div>
        number: <input value={props.newNum} onChange={props.handleNumChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )


const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNum, setNewNum ] = useState('')
  const [ showFiltered, setFilter] = useState('')
  const [ doneMessage, setDoneMessage ] = useState(null)
  const [ errorMessage, setErrorMessage ] = useState(null)

  const filteredPersons = persons.filter(x => x.name.toLowerCase().includes(showFiltered.toLowerCase()))

  useEffect(() => {
    personService
      .getAll()
      .then(initialNotes => {
        setPersons(initialNotes)
      })
  }, [])

  

  const addName = (event) => {
    event.preventDefault()
    const nameObj = {
      name: newName,
      number: newNum
    }
    console.log('nameObj: ', nameObj)
    console.log('persons: ', persons)
    if (persons.map(person => person.name).includes(newName) === false) {
      personService
      .create(nameObj)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNum('')
        setDoneMessage(`Added ${returnedPerson.name}`)
        setTimeout(() => {
          setDoneMessage(null)
        }, 5000)
      })
    }
    else {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const foundID = persons.find(x => x.name === newName).id
        personService
          .update(foundID, nameObj)
          .then (updatedPerson => {
            setPersons(persons.map(x => x.id !== foundID ? x : updatedPerson))
            setNewName('')
            setNewNum('')
            setDoneMessage(`Changed number for ${updatedPerson.name}`)
            setTimeout(() => {
              setDoneMessage(null)
            }, 5000)
          })
          .catch(error => {
            setErrorMessage(`${newName} was already removed from the phonebook`)
            setTimeout(() => {setErrorMessage(null)}, 5000)
            setPersons(persons.filter(x => x.id !== foundID))
          })
        }
      }
    }

  const removePerson = (id) => {
    if (window.confirm(`Delete ${persons.find(x => x.id === id).name}?`)) {
      personService
        .remove(id)

      setPersons(persons.filter(x => x.id !== id))
    }

  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumChange = (event) => {
    setNewNum(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const DoneNotification = ({message}) => {
    if (message === null) {
      return null
    }

    return (
      <div className="doneNoti">
        {message}
      </div>
    )
  }

  const ErrorNotification = ({message}) => {
    if (message === null) {
      return null
    }

    return (
      <div className="error">
        {message}
      </div>
    )
  }
  

  return (
    <div>
      <h1>Phonebook</h1>
      <DoneNotification message={doneMessage} />
      <ErrorNotification message = {errorMessage} />
      <h2>add a new</h2>
      <PersonForm
        addName={addName}
        newName={newName}
        newNum={newNum}
        handleNameChange={handleNameChange}
        handleNumChange={handleNumChange}
      />
      <h2>Numbers</h2>
      <div>
      {filteredPersons.map(person => 
        <Person 
          person={person}
          key={person.id}
          removePerson={() => removePerson(person.id)}
        />)}
      </div>
      <Filter filt={showFiltered} handle={handleFilterChange}/>
    </div>
  )
}

export default App