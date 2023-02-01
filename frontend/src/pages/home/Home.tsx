import React, { useEffect, useState } from 'react'
import styles from './Home.module.scss'

export type ArticleType = {
  id: string
  date: string
  title: string
  text: string
}

const Home = () => {
  const [articles, setArticles] = useState<ArticleType[]>([])
  const getArticles = async () => {
    try {
      // const res = await $api.get(`${API_URL}articles`)
      // const res = await fetch(`${API_URL}articles`)
      const res = await fetch(`api/articles`)
      if (res.ok) {
        // если HTTP-статус в диапазоне 200-299
        // получаем тело ответа (см. про этот метод ниже)
        let json = await res.json()
        setArticles(json ?? [])
      }

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
  return (
    <>
      <div>Articles App</div>
      <div className={styles.article_container}>
        {articles?.length > 0 &&
          articles.map((elem) => (
            <div key={elem.id} className={styles.article_item}>
              <div>{elem.title}</div>
              <div>{elem.date}</div>
            </div>
          ))}
      </div>
    </>
  )
}

export default Home
