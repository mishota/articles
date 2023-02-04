import React, { useEffect, useState } from 'react'

import { BiNews } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'

import { getArticles } from '../../features/articles/articlesSlice'
import { useAppDispatch, useAppSelector } from '../../store'
import styles from './Home.module.scss'

export type ArticleType = {
  id: string
  date: string
  title: string
  text: string
}

const Home = () => {
  // const [articles, setArticles] = useState<ArticleType[]>([])
  const { articles } = useAppSelector((state) => state.articles)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  
  // const getArticles = async () => {
  //   try {
  //     // const res = await $api.get(`${API_URL}articles`)
  //     // const res = await fetch(`${API_URL}articles`)
  //     const res = await fetch(`api/articles`)
  //     if (res.ok) {
  //       // если HTTP-статус в диапазоне 200-299
  //       // получаем тело ответа (см. про этот метод ниже)
  //       let json = await res.json()
  //       setArticles(json ?? [])
  //     }

  //     console.log(res)
  //   } catch (e) {
  //     console.error(e)
  //   }

  //   try {
  //     // const res2 = await $api.get('articles/56c782f1a2c2c3268ddb3206')
  //     const res2 = await fetch('api/articles/56c782f1a2c2c3268ddb3206')

  //     console.log(res2)
  //   } catch (e) {
  //     console.error(e)
  //   }
  // }

  useEffect(() => {
    // getArticles()
   
    dispatch(getArticles())
  }, [])
  return (
    <>
      <div className={styles.title}>Articles App</div>
      <div className="green_line" />
      <div className={styles.article_container}>
        {articles?.length > 0 &&
          articles.map((elem) => (
            <div key={elem.id} className={styles.article_item} onClick={() => navigate(`/${elem.id}`)}>
              <div className={styles.title_art}>
                <div>
                  <BiNews color="#579e8c" size={20} />
                </div>
                <div>{elem.title}</div>
              </div>
              <div className="green_line" />
              <div className={styles.date}>{elem.date.split('T')[0]}</div>
            </div>
          ))}
      </div>
    </>
  )
}

export default Home
