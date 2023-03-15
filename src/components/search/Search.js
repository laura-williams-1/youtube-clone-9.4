import React from 'react'
import { useState, useEffect } from 'react'
import './search.css'
import { useNavigate } from 'react-router-dom'

function Search({ videos }) {
  const navigate = useNavigate()
  const [trendingVideo, setTrendingVideo] = useState()

  useEffect(() => {
    fetch(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=15&key=${process.env.REACT_APP_API_KEY}`
    )
      .then(res => res.json())
      .then(response => {
        console.log('we made it!')
        //DATA ARR
        setTrendingVideo(response.items)
      })
  }, [])

  return (
    <div className='search'>
      <div className='results'>
        <ul className='video-results'>
          {
          videos.length>0?null:trendingVideo.map((video, index) => {
            let popVidImg = video.snippet.thumbnails.medium.url
            return (
              <li key={index}>
                <img src={popVidImg} alt='trending-video-thumbnail' />
                <h2>{video.snippet.title}</h2>
              </li>
            )
          })}
          {videos.map((video, index) => {
            let someVideos = video.snippet.thumbnails.medium.url

            return (
              <li
                key={index}
                onClick={() => {
                  navigate(`/video/:${video.id.videoId}`)
                }}
              >
                <img src={someVideos} alt='video-thumbnail' />
                <h2>{video.snippet.title}</h2>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default Search
