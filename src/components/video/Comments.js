import React, { useState, useEffect } from 'react'
export default function Comments() {
  const regex = /^\s*$/
  const [show, setShow] = useState(false)
  const [error, setError] = useState({
    user: false,
    body: false,
  })
  const [comments, setComments] = useState([])
  const [comment, setComment] = useState({
    user: '',
    body: '',
  })
  const clearError = ()=>{
      setTimeout(() => {
          setError({
              user: false,
              body: false,
            })
        },[3000])
    }
      const cancel = () => {
    setComment({
      user: '',
      body: '',
    })
    setShow(!show)
  }
  const handleTextChange = e => {
    setComment({
      ...comment,
      [e.target.id]: e.target.value,
    })
  }
  const submit = e => {
    e.preventDefault()
    console.log(regex.test(comment.user) && !regex.test(comment.body))

    if (!regex.test(comment.user) && !regex.test(comment.body)) {
      setComments([...comments, comment])
    } else if (regex.test(comment.user) && regex.test(comment.body)) {
      setError({ user: true, body: true })
      clearError()
    } else if (regex.test(comment.user)) {
      setError({ ...error, user: true })
      clearError()
    } else if (regex.test(comment.body)) {
      setError({ ...error, body: true })
      clearError()
    }
  }
  return (
    <section className='comments'>
      {!show && <button onClick={() => setShow(!show)}>Add Comment</button>}
      {show && (
        <form onSubmit={submit}>
          <div className='comment-inputs'>
            <label htmlFor='user'>Name:</label>
            <br />
            <input
              type='text'
              id='user'
              name='user'
              onChange={handleTextChange}
              placeholder='Name'
            />
            {error.user && (
              <span className='error'>Please do not leave name blank</span>
            )}
            <br />
            <br />
            <br />
            <label htmlFor='body'>Comment:</label>
            <br />
            <textarea
              id='body'
              name='body'
              onChange={handleTextChange}
              placeholder='...'
            />
            {error.body && (
              <span className='error'>Please do not leave out comment </span>
            )}
            <br />
            <input
              type='button'
              value='Cancel'
              id='comment-btn'
              onClick={cancel}
            />
            <input type='submit' value='Comment' id='comment-btn' />
          </div>
        </form>
      )}

      {comments.map((com, i) => (
        <div key={`comment-${i}`}>
          <h5>{com.user}</h5>
          <p>{com.body}</p>
        </div>
      ))}
    </section>
  )
}
