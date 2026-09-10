import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)

}

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject)
  return request.then(request => request.data)
}


const remove = (id) => {
  return axios.delete(`http://localhost:3001/persons/${id}`)
}


export default { getAll, create, remove }