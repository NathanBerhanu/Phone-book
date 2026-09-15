require('dotenv').config()
const http = require('http')
const express = require('express')
const Person = require('./models/person')
const morgan = require('morgan')

const app = express()

app.use(express.static('dist'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))

morgan.token('content', (request, response) =>{
  body = request.body
  return JSON.stringify(body)
})

if(process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}


const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]



const Quantity = Person.length

const generateId = () => {
  const id = Math.random() * 100
  return String(id)
}


app.get('/', (request, response) => {
  response.send('hello')
})


app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/info', (request, response) => {
   response.send(`Phonebook has info for ${Quantity} people ${new Date()}`)
})


app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.json(person)
      }
  })
})


app.post('/api/persons', (request, response) => {
  const body = request.body

  if(
    !body.name ||
    !body.number
  ){  
    return response.status(404).json({ error: 'empty parameter or already exisitng' })

  }
  const person = new Person({
      name : body.name,
      number: body.number
  })

  person.save().then(savedPersons => {
     response.json(savedPersons)
  })

})


app.delete('/api/persons/:id', async (request, response) => {
  const person = await Person.findByIdAndDelete(request.params.id)

  if (!person) {
    return response.status(404).end()
  }

  response.status(204).end()
})


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})