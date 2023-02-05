import React, { useState, useEffect } from 'react'

import { useNavigate, useParams } from 'react-router-dom'

import { getChosenArticle } from '../../features/articles/articlesSlice'
import { useAppDispatch, useAppSelector } from '../../store'
import AddComment from './addComment/AddComment'
import styles from './Article.module.scss'

export type CommentType = {
  id: string
  article: string
  text: string
  user: string
}

const Article = () => {
  const { chosenArticle, isLoading } = useAppSelector((state) => state.articles)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const [isOpenComments, setIsOpenComments] = useState(false)
  const [isAddComment, setIsAddComment] = useState(false)

  const [comments, setComments] = useState<CommentType[]>([])

  useEffect(() => {
    id && dispatch(getChosenArticle(id))
  }, [id])

  const getComments = async () => {
    try {
      const res = await fetch(`api/comments?article=${id}`)
      if (res.ok) {
        let json = await res.json()
        setComments(json)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    isOpenComments && getComments()
  }, [isOpenComments])

  if (isLoading) {
    return <div>Loading...</div>
  }
  return (
    <div className={styles.container}>
      <button className="main_button" onClick={() => navigate(`/`)} style={{ alignSelf: 'start' }}>
        BACK
      </button>
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

      {isOpenComments ? (
        <button className="main_button" onClick={() => setIsOpenComments(false)}>
          Hide Comments
        </button>
      ) : (
        <button className="main_button" onClick={() => setIsOpenComments(true)}>
          Show Comments
        </button>
      )}
      {isOpenComments && (
        <div className={styles.comments_container}>
          {comments.length > 0 &&
            comments.map((elem) => (
              <div key={elem.id} className={styles.comments_item}>
                <div className={styles.user}>{elem.user}</div>
                <div className={styles.comments_text}>{elem.text}</div>
              </div>
            ))}

          {isAddComment ? (
            <AddComment id={id ?? ''} setComments={setComments} setIsAddComment={setIsAddComment} />
          ) : (
            <button className="main_button" onClick={() => setIsAddComment(true)}>
              Add Comment
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default Article
