import axios from 'axios'
const storage = window.localStorage

const request = (method, url, data = {}, params = {}) => {
  console.log(data)
  console.log(`
    making ${method}request to ${url}
    params? ${params}
  `)
  return axios({
    baseURL: 'http://localhost:3000',
    method,
    url,
    data,
    params,
    headers: {
      'Authorization': storage.getItem('token')
    }
  })
}

export default request
