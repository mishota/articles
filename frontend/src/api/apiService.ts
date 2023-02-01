import axios from 'axios'

// export const API_URL = "https://api.dct-trips.com"; // PRODUCTION
export const API_URL = 'http://localhost:3001/api/' // DEVELOPMENT

const $api = axios.create({
  baseURL: API_URL,
  headers: {
    accept: 'application/json',
  },
})

export const $apiWithoutToken = axios.create({
  // withCredentials: true,
  baseURL: API_URL,
})

export default $api
