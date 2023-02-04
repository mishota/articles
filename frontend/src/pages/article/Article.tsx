import React, { useEffect } from 'react'

import { useNavigate, useParams } from 'react-router-dom'

import { getChosenArticle } from '../../features/articles/articlesSlice'
import { useAppDispatch, useAppSelector } from '../../store'
import styles from './Article.module.scss'

export type ArticleType = {
  id: string
  date: string
  title: string
  text: string
}

const Article = () => {
  const { chosenArticle, isLoading } = useAppSelector((state) => state.articles)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    id && dispatch(getChosenArticle(id))
  }, [id])
  if (isLoading) {
    return <div>Loading...</div>
  }
  return (
    <div className={styles.container}>
      <div className={styles.title}>{chosenArticle.title}</div>
      <div className="green_line" />
      <div className={styles.article_container}>
        <div key={chosenArticle.id} className={styles.article_item}>
          <div className={styles.title_art}>
            <div>{chosenArticle.text}</div>
          </div>
          <div className="green_line" />
          <div className={styles.date}>{chosenArticle.date.split('T')[0]}</div>
        </div>
      </div>

      <button className="main_button" onClick={() => navigate(`/`)}>
        BACK
      </button>
    </div>
  )
}

export default Article
