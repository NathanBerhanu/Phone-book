import axios from 'axios'

const baseUrl = '/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)

}

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject)
  return request.then(request => request.data)
}


const remove = (id) => {
  console.log(`${baseUrl}/${id}`)
  return axios.delete(`${baseUrl}/${id}`)
}


export default { getAll, create, remove }