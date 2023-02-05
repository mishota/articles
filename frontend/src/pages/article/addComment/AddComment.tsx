import React from 'react'
import { useForm } from 'react-hook-form'
import { SubmitHandler } from 'react-hook-form/dist/types'
import { CommentType } from '../Article'

import styles from './AddComment.module.scss'

export type CommentForm = {
  // user: string
  text: string
}

type PropsType = {
  id: string
  setComments: React.Dispatch<React.SetStateAction<CommentType[]>>
  setIsAddComment: React.Dispatch<React.SetStateAction<boolean>>
}

const AddComment = ({ id, setComments, setIsAddComment }: PropsType) => {
  // React hook form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<CommentForm>({
    mode: 'all',
  })

  const onSubmitCommentForm: SubmitHandler<CommentForm> = async (data) => {
    const rd = {
      user: 'currentUser',
      text: data.text,
      article: id,
    }
    try {
      const res = await fetch(`api/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(rd),
      })
      if (res.ok) {
        let json = await res.json()
        setComments((comments) => [...comments, json])
        setIsAddComment(false)
      }
    } catch (error) {
      console.error(error)
    }
    reset()
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>Add comment</div>
      <div className="green_line" />
      <div className={styles.article_item}>
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

        {/* <div>
            <input
              placeholder="user"
              className="gray_input"
              {...register('user', {
                required: 'The field is required!',
                minLength: {
                  value: 4,
                  message: 'Min 4 letters!',
                },
              })}
            />
            {errors?.user && <div className="required">{errors.user.message || 'Error!'}</div>}
          </div> */}
      </div>

      <button className="main_button" onClick={handleSubmit(onSubmitCommentForm)} disabled={!isValid}>
        Submit
      </button>
    </div>
  )
}

export default AddComment
