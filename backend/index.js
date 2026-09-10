const http = require('http')
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))

morgan.token('content', (request, response) =>{
  body = request.body
  return JSON.stringify(body)
})


let Persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const Quantity = Persons.length

const generateId = () => {
  const id = Math.random() * 100
  return String(id)
}


app.get('/', (request, response) => {
  response.send('hello')
})


app.get('/api/persons', (request, response) => {
  response.json(Persons)
})

app.get('/info', (request, response) => {
   response.send(`Phonebook has info for ${Quantity} people<br>${new Date()}`)
})


app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = Persons.find(p => p.id === id)
  if(person){
    response.json(person)
  }else{
    response.status(404).end()
  }
})


app.post('/api/persons', (request, response) => {
  const body = request.body

  if(
    !body.name ||
    !body.number ||
    Persons.some(p => p.name === body.name) ||
    Persons.some(p => p.number === body.number)
  ){
    return response.status(404).json({ error: 'empty parameter or already exisitng' })

  }else{
    const person = {
      id: generateId(),
      name : body.name,
      number: body.number
    }
  
    persons = Persons.concat(person)
    
    response.json(persons)

  }
})


app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = Persons.find(p => p.id === id)
  const newPersons = Persons.filter(p => p.id !== id)


  if(person){
    response.status(204).end()
  }else{
    response.status(404).end()
  }
})


const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)