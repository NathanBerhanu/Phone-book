import { useState, useEffect } from "react"
import axios, { create } from 'axios'
import Number from "./components/Number"
import Form from "./components/Form" 
import Filter from "./components/Filter"
import Notification from "./components/Notification"
import personsService from "./services/persons"



const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [filter, setFilter] = useState('')
  const [popup, setPopup] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(()=> {
    personsService.getAll().then(initialpersons => {
      setPersons(initialpersons)
    })}, [])

  const personsToShow = persons.filter(person =>
  person.name.toLowerCase().includes(filter.toLowerCase()) ||
  person.number.includes(filter)
  )


  const deletePerson = (id) => {
    const removedPerson = persons.find(p => p.id === id)

    if(window.confirm(`Delete this person ?`)){
      personsService.remove(id).then(() => {
        setPersons(persons.filter(person => person.id !== id))
      }).catch((error) => {
          const message = error.response?.data?.error || 'Could not delete person'
          setErrorMessage(`${removedPerson?.name || 'Person'}: ${message}`)
          setTimeout(() => {
            setErrorMessage('')
          }, 5000);
        }
      )
    }
  }

  const notify = (person) => {
      setPopup(`${person.name} has been added`)
      setTimeout(() => setPopup(''), 5000)
  }
  
  const addPerson = (event) => {
    event.preventDefault()

    const name = newName.trim()
    const number = newNum.trim()

    if(persons.some(person => person.name.trim() === name)){
      alert(`${name} is already in the phonebook`)
    }

    if (!/^[0-9-]+$/.test(number)) {
      alert('The phone number can only contain numbers and hyphens')
      return
    }
   
    const personObject = {
      name: name,
      number: number
    } 

    personsService.create(personObject).then(initialperson => {
        setPersons(persons.concat(initialperson))
        setNewName('')
        setNewNum('')
        notify(initialperson)
      }).catch(error => {
      console.error('Could not add person:', error)
    })


  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  
  const handleNumChange = (event) => {
    setNewNum(event.target.value)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  return(
    <div>
      <h2>PhoneBook</h2>

      <Notification message={errorMessage}/>

      <Filter filter = {filter} handleFilter = {handleFilter}/>

      <h3>Add a new</h3>

      <Form addPerson = {addPerson} newName = {newName} newNum = {newNum} handleNameChange = {handleNameChange} handleNumChange= {handleNumChange}/>

      <h3>Numbers</h3>

      <Number personsToSHow={personsToShow} removePerson={deletePerson}/>

    </div>
  )
}

export default App