import React, { useEffect, useState } from 'react'
import { useParams, NavLink } from 'react-router-dom'
import YouTube from 'react-youtube'
import Comments from './Comments'
import './Video.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faThumbsUp } from '@fortawesome/free-regular-svg-icons'

export default function Video() {
  const { id } = useParams()
  const [vids, setVids] = useState([])
  const [info, setInfo] = useState()
  const [show, setShow] = useState()
  const [date, setDate] = useState()

  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  })
  useEffect(() => {
    fetch(`https://www.googleapis.com/youtube/v3/videos?id=${id}&key=${process.env.REACT_APP_API_KEY}
    &fields=items(id,snippet,statistics)&part=snippet,statistics`)
      .then(res => res.json())
      .then(data => {
        setInfo(data.items)
      })
  }, [id])
  useEffect(() => {
    if (info) {
      fetch(
        `https://youtube.googleapis.com/youtube/v3/search?q=${info[0].snippet.channelTitle.toLowerCase()}&part=snippet&maxResults=15&key=${
          process.env.REACT_APP_API_KEY
        }`
      )
        .then(res => res.json())
        .then(data => {
          setVids(data.items)
        })
      let date = new Date(info[0].snippet.publishedAt)
        .toDateString()
        .split(' ')
        .slice(1, 4)
      date[1] = date[1] + ','
      setDate(date.join(' '))
    }
  }, [info])
  function debounce(fn, ms) {
    let timer
    return _ => {
      clearTimeout(timer)
      timer = setTimeout(_ => {
        timer = null
        fn.apply(this, arguments)
      }, ms)
    }
  }
  useEffect(() => {
    const debouncedHandleResize = debounce(function handleResize() {
      if (window.innerHeight <= 500) {
        setDimensions({
          height: window.innerHeight,
          width: window.innerWidth,
        })
      } else if (window.innerWidth <= 650) {
        setDimensions({
          height: window.innerHeight * 0.6,
          width: window.innerWidth,
        })
      } else {
        setDimensions({
          height: window.innerHeight * 0.6,
          width: window.innerWidth * 0.6,
        })
      }
    }, 100)
    window.addEventListener('resize', debouncedHandleResize)
    return () => {
      window.removeEventListener('resize', debouncedHandleResize)
    }
  })

  const opts = {
    height: `${dimensions.height}`,
    width: `${dimensions.width}`,
    playerVars: {
      autoplay: 0,
    },
  }

  const _onReady = event => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo()
  }
  return (
    <div className='video-page'>
      <section id='youtube-video'>
        <YouTube
          className='video'
          videoId={id}
          opts={opts}
          onReady={_onReady}
        />
        <section>
          {info && (
            <aside className='video-info'>
              <aside>
                <h2>{info[0].snippet.title}</h2>
                <span>{date}</span>
                <p>{info[0].snippet.channelTitle}</p>
              </aside>
              <aside className='stats space'>
                <span>
                  <FontAwesomeIcon size='2x' icon={faEye} />{' '}
                  {info[0].statistics.viewCount}
                </span>
                <span className='space'>
                  {' '}
                  <FontAwesomeIcon icon={faThumbsUp} size='2x' />{' '}
                  {info[0].statistics.likeCount}
                </span>
              </aside>
            </aside>
          )}
        </section>
        {show ? (
          <div>
            <p>{info[0].snippet.description}</p>
          </div>
        ) : null}
        <button
          className={show ? 'btn more' : 'btn less'}
          onClick={() => setShow(!show)}
        >
          {show ? 'Show Less' : 'Show More '}
        </button>
        <hr />
      </section>
      <section className='comments'>
        <Comments />
      </section>
      <section className='parent'>
        <h2>Related Videos</h2>
        <div className='search-results'>
          {vids.length > 0 &&
            vids.map(video => {
              console.log(video)
              let vidDate = new Date(video.snippet.publishedAt)
                .toDateString()
                .split(' ')
                .slice(1, 4)
              vidDate[1] = vidDate[1] + ','
              vidDate = vidDate.join(' ')
              return (
                <NavLink
                  key={`results${video.etag}`}
                  className='video-card search-result'
                  to={`/video/${video.id.videoId}`}
                >
                  <img
                    src={video.snippet.thumbnails.medium.url}
                    alt='video-thumbnail'
                  />
                  <aside className='details'>
                    <h2>{video.snippet.title}</h2>
                    <p>{vidDate}</p>
                  </aside>
                </NavLink>
              )
            })}
        </div>
      </section>
    </div>
  )
}
