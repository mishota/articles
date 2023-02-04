import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { SubmitHandler } from 'react-hook-form/dist/types'

import { useNavigate, useParams } from 'react-router-dom'

import { addArticle, getChosenArticle } from '../../features/articles/articlesSlice'
import { useAppDispatch, useAppSelector } from '../../store'
import styles from './Add.module.scss'

export type ArticleForm = {
  title: string
  text: string
}

const Add = () => {
  const { isLoading } = useAppSelector((state) => state.articles)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  // React hook form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ArticleForm>({
    mode: 'all',
  })

  const onSubmitAricleForm: SubmitHandler<ArticleForm> = (data) => {
    dispatch(addArticle(data))
    reset()
    navigate('/')
  }
  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>Add article</div>
      <div className="green_line" />
      <div className={styles.article_container}>
        <div className={styles.article_item}>
          <div>
            <input
              placeholder="title"
              type="text"
              className="gray_input"
              {...register('title', {
                required: 'The field is required!',
                minLength: {
                  value: 4,
                  message: 'Min 4 letters!',
                },
              })}
            />
            {errors?.title && <div className="required">{errors.title.message || 'Error!'}</div>}
          </div>

          <div>
            <textarea
              placeholder="text"
              className="gray_input"
              rows={4}
              {...register('text', {
                required: 'The field is required!',
                minLength: {
                  value: 4,
                  message: 'Min 4 letters!',
                },
              })}
            />
            {errors?.text && <div className="required">{errors.text.message || 'Error!'}</div>}
          </div>
        </div>
      </div>

      <button className="main_button" onClick={handleSubmit(onSubmitAricleForm)} disabled={!isValid}>
        Submit
      </button>
    </div>
  )
}

export default Add
