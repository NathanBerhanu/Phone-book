require('dotenv').config()
const http = require('http')
const express = require('express')
const Person = require('./models/person')
const morgan = require('morgan')
const { error } = require('console')
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name == 'CastError'){
    return response.status(400).send({error: 'malinformatted id'})
  }else if (error.name == 'ValidationError'){
    return response.status(400).json({error: error.message})
  }

  next(error)
}

const app = express()

app.use(express.static('dist'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))

morgan.token('content', (request, response) =>{
  body = request.body
  return JSON.stringify(body)
})



const Quantity = Person.length

const generateId = () => {
  const id = Math.random() * 100
  return String(id)
}


app.get('/', (request, response) => {
  response.send('hello')
})


app.get('/api/persons', (request, response, next) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
  .catch(error => next(error))
})

app.get('/info', (request, response) => {
   response.send(`Phonebook has info for ${Quantity} people ${new Date()}`)
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.json(person)
      }
  })
  .catch(error => next(error))
})


app.post('/api/persons', (request, response, next) => {
  const { name, number } = request.body

  const person = new Person({
    name: name,
    number: number
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
  .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      if (!result) {
        return response.status(404).json({ error: 'person not found' })
      }

      response.status(204).end()
    })
    .catch(error => next(error))
})


app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})