import React, { useEffect, useState } from 'react'
import './App.css'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import Search from './components/search/Search'
import Video from './components/video/Video'
import About from './components/about/About'

function App() {
  const navigate = useNavigate()
  const [videos, setVideos] = useState([])
  const [search, setSearch] = useState('')

  function handleBtn(event){
    event.preventDefault();
    fetch(`https://youtube.googleapis.com/youtube/v3/search?q=${search.toLowerCase()}&part=snippet&maxResults=15&key=${process.env.REACT_APP_API_KEY}`)
    .then((res) => res.json())
    .then((response) => {
        // console.log('we made it!', )
        //DATA ARR
        let video = response.items
    let searchedVideos = video.map((video, index) => {
      let someVideos = video.snippet.thumbnails.medium.url;
      console.log(video);
      return (
        <li
          key={index}
          onClick={() => {navigate(`/video/${video.id.videoId}`)}}
        >
          <img src={someVideos} alt="video-thumbnail" />
          <h2>{video.snippet.title}</h2>
        </li>
      );
    });

    setVideos(searchedVideos);
    // console.log(videoItem);
    setSearch('')
  }); //THEN CLOSING TAG
}

  function submit(event) {
    event.preventDefault()
    console.log(search, 'haha')
    fetch(
      `https://youtube.googleapis.com/youtube/v3/search?q=${search.toLowerCase()}&part=snippet&maxResults=15&key=${
        process.env.REACT_APP_API_KEY
      }`
    )
      .then(res => res.json())
      .then(response => {
        setVideos(response.items)
      })
  }
  const handleTextChange = e => {
    setSearch(e.target.value)
  }

  return (
    <div className='App'>
      <Navbar submit={handleBtn} handleTextChange={handleTextChange} />
      <Routes>
        <Route path='/' element={<Search videos={videos} />} />
        <Route path='/video/:id' element={<Video />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </div>
  )
}

export default App
