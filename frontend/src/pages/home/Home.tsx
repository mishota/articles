import React, { useEffect, useState } from 'react'

import { BiNews } from 'react-icons/bi'
import { AiFillCloseCircle } from 'react-icons/ai'
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

const itemsPerPage = 4

const Home = () => {
  // const [articles, setArticles] = useState<ArticleType[]>([])
  const { articles } = useAppSelector((state) => state.articles)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [filterArticles, setFilterArticles] = useState(articles)

  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [title, setTitle] = useState('')

  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    dispatch(getArticles())
  }, [])

  useEffect(() => {
    setFilterArticles(articles)
  }, [articles])

  useEffect(() => {
    if (title && !dateFrom && !dateTo) {
      setFilterArticles(articles.filter((elem) => elem.title.toLowerCase().includes(title.toLowerCase())))
    } else if (title && dateFrom && !dateTo) {
      setFilterArticles(
        articles
          .filter((elem) => elem.title.toLowerCase().includes(title.toLowerCase()))
          .filter((elem) => +new Date(elem.date) >= +new Date(dateFrom)),
      )
    } else if (title && dateFrom && dateTo) {
      setFilterArticles(
        articles
          .filter((elem) => elem.title.toLowerCase().includes(title.toLowerCase()))
          .filter((elem) => +new Date(elem.date) >= +new Date(dateFrom))
          .filter((elem) => +new Date(elem.date) <= +new Date(dateTo)),
      )
    } else if (!title && dateFrom && dateTo) {
      setFilterArticles(
        articles
          .filter((elem) => +new Date(elem.date) >= +new Date(dateFrom))
          .filter((elem) => +new Date(elem.date) <= +new Date(dateTo)),
      )
    } else if (!title && !dateFrom && dateTo) {
      setFilterArticles(articles.filter((elem) => +new Date(elem.date) <= +new Date(dateTo)))
    } else if (!title && dateFrom && !dateTo) {
      setFilterArticles(articles.filter((elem) => +new Date(elem.date) >= +new Date(dateFrom)))
    } else {
      setFilterArticles(articles)
    }
  }, [articles, title, dateFrom, dateTo])

  useEffect(() => {
    //
  }, [currentPage])

  return (
    <>
      <div className={styles.title}>Articles App</div>
      <div className="green_line" />
      <div className={styles.manage}>
        <div className={styles.manage_item}>
          <div>Title</div>
          <div className={styles.flex}>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="gray_input" />
            <AiFillCloseCircle color="#579e8c" size={20} onClick={() => setTitle('')} />
          </div>
        </div>
        <div className={styles.manage_item}>
          <div>From</div>
          <div className={styles.flex}>
            <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="gray_input" />
            <AiFillCloseCircle color="#579e8c" size={20} onClick={() => setDateFrom('')} />
          </div>
        </div>
        <div className={styles.manage_item}>
          <div>To</div>
          <div className={styles.flex}>
            <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="gray_input" />
            <AiFillCloseCircle color="#579e8c" size={20} onClick={() => setDateTo('')} />
          </div>
        </div>
      </div>
      <div className={styles.article_container}>
        {filterArticles?.length > 0 &&
          filterArticles.map((elem) => (
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

      <button className="main_button" onClick={() => navigate(`/add`)}>
        ADD
      </button>
    </>
  )
}

export default Home
