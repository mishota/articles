import React, { useEffect } from 'react'
import $api, { API_URL } from '../../api/apiService'

const Home = () => {
  const getArticles = async () => {
    try {
      // const res = await $api.get(`${API_URL}articles`)
      // const res = await fetch(`${API_URL}articles`)
      const res = await fetch(`api/articles`)

      console.log(res)
    } catch (e) {
      console.error(e)
    }

    try {
      // const res2 = await $api.get('articles/56c782f1a2c2c3268ddb3206')
      const res2 = await fetch('api/articles/56c782f1a2c2c3268ddb3206')

      console.log(res2)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    getArticles()
  }, [])
  return <div>Articles App</div>
}

export default Home
