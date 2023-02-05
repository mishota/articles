import React, { useEffect, useState } from 'react'

import { BiNews } from 'react-icons/bi'
import { AiFillCloseCircle } from 'react-icons/ai'
import { MdDeleteForever } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { getArticles, IArticle } from '../../features/articles/articlesSlice'
import { useAppDispatch, useAppSelector } from '../../store'
import styles from './Home.module.scss'

const itemsPerPage = 3

const Home = () => {
  const { articles, isLoading } = useAppSelector((state) => state.articles)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [filterArticles, setFilterArticles] = useState(articles)
  const [visibleArticles, setVisibleArticles] = useState(articles)

  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [title, setTitle] = useState('')

  const [currentPage, setCurrentPage] = useState(1)

  const [currentArticle, setCurrentArticle] = useState<IArticle | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    dispatch(getArticles())
  }, [])

  useEffect(() => {
    setFilterArticles(articles)
  }, [articles])

  useEffect(() => {
    setVisibleArticles(filterArticles.slice(0, currentPage * itemsPerPage))
  }, [filterArticles, currentPage])

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
    } else if (!title && dateFrom && !dateTo) {
      setFilterArticles(articles.filter((elem) => +new Date(elem.date) >= +new Date(dateFrom)))
    } else if (!title && !dateFrom && dateTo) {
      setFilterArticles(articles.filter((elem) => +new Date(elem.date) <= +new Date(dateTo)))
    } else {
      setFilterArticles(articles)
    }
    setCurrentPage(1)
  }, [articles, title, dateFrom, dateTo])

  const handleDelete = () => {
    setFilterArticles((filterArticles) => filterArticles.filter((elem) => elem.id !== currentArticle?.id))
    setCurrentArticle(null)
    setIsOpen(false)
  }
  if (isLoading) {
    return <div>Loading...</div>
  }
  return (
    <div className={styles.container}>
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
        <button className="main_button" onClick={() => navigate(`/add`)}>
          ADD
        </button>
      </div>
      <div className={styles.article_container}>
        {visibleArticles?.length > 0 &&
          visibleArticles.map((elem) => (
            <div key={elem.id} className={styles.article_item}>
              <div className={styles.title_art} onClick={() => navigate(`/${elem.id}`)}>
                <div>
                  <BiNews color="#579e8c" size={20} />
                </div>
                <div>{elem.title}</div>
              </div>
              <div className="green_line" />
              <div className={styles.date}>{elem.date.split('T')[0]}</div>
              <MdDeleteForever
                color="#f50d62"
                size={30}
                onClick={() => {
                  setCurrentArticle(elem)
                  setIsOpen(true)
                }}
                className={styles.delete}
              />
            </div>
          ))}
      </div>
      {currentPage * itemsPerPage < filterArticles.length && (
        <button className="main_button" onClick={() => setCurrentPage((currentPage) => currentPage + 1)}>
          Load more
        </button>
      )}

      <div className={isOpen ? styles.modal : styles.hide}>
        <div className={styles.modal_content}>
          <div> Delete article</div>
          <div> {currentArticle?.title}?</div>
          <div className={styles.flex_button}>
            <button className={styles.button_delete} onClick={handleDelete}>
              Delete
            </button>
            <button className={styles.button_cancel} onClick={() => setIsOpen(false)}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
