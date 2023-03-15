import React, { useEffect, useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import Search from './components/search/Search'
import Video from './components/video/Video'
import About from './components/about/About'

function App() {
  const [videos, setVideos] = useState([])
  const [search, setSearch] = useState('')
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
    console.log(search)
  }
  useEffect(()=>console.log(videos), [videos])

  return (
    <div className='App'>
      <Navbar submit={submit} handleTextChange={handleTextChange} />
      <Routes>
        <Route path='/' element={<Search videos={videos} />} />
        <Route path='/video/:id' element={<Video />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </div>
  )
}

export default App
