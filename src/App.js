import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Search from "./components/search/Search";
import Video from "./components/video/Video";
import About from "./components/about/About";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/video/:id" element={<Video />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
