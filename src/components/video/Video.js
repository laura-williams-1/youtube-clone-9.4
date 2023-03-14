import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import YouTube from 'react-youtube'

export default function Video() {
  const { id } = useParams()
  const [comments, setComments] = useState([])
  const [comment, setComment] = useState({
    user: '',
    body: '',
  })
useEffect(()=>console.log(comment), [comment])
  const handleTextChange = (e)=>{
    setComment({
        ...comment,
        [e.target.id]:e.target.value
    })
  }
  console.log(id)
  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 0,
    },
  }
  const submit = (e)=>{
    e.preventDefault()
    setComments([...comments, comment])
  }
  const _onReady = event => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo()
  }
  return (
    <div className='video-page'>
      <YouTube className='video' videoId={id} opts={opts} onReady={_onReady} />
      <section className='comments'>
        <form onSubmit={submit}>
            <label htmlFor='user'>Name:</label>
            <input type='text' id='user' name='user' onChange={handleTextChange} placeholder='Name'/>
            <label htmlFor='body'>Comment:</label>
            <input type='text' id='body' name='body' onChange={handleTextChange} placeholder='...'/>
        <input type='submit' value='Comment' id='comment-btn'/>
        </form>
        
        {
            comments.map(com=>(
                <div>
                    <h5>{com.user}</h5>
                    <p>{com.body}</p>
                </div>
            ))
        }
      </section>
    </div>
  )
}
