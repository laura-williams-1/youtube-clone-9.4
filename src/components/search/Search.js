import React from "react";
import { useState } from "react";
import "./search.css";
import { useNavigate } from "react-router-dom";

function Search() {
  const [videoItem, setVideoItem] = useState([]);
  const navigate = useNavigate();

  function handleBtn(event) {
    event.preventDefault();
    let searchItem = event.target.searchbox.value;
    console.log(searchItem);
    fetch(
      `https://youtube.googleapis.com/youtube/v3/search?q=${searchItem.toLowerCase()}&part=snippet&maxResults=10&key=${
        process.env.REACT_APP_API_KEY
      }`
    )
      .then((res) => res.json())
      .then((response) => {
        console.log("we made it!");
        //DATA ARR
        let videos = response.items;

        let searchedVideos = videos.map((video, index) => {
          let someVideos = video.snippet.thumbnails.medium.url;
          return (
            <li
              key={index}
              onClick={() => {
                navigate(`/video/:${video.id}`);
              }}
            >
              <img src={someVideos} alt="video-thumbnail" />
              <h2>{video.snippet.title}</h2>
            </li>
          );
        });

        setVideoItem(searchedVideos);
        console.log(videoItem);

        searchItem = "";
      }); //THEN CLOSING TAG
  } //BTN FUNCTION CLOSING TAG

  return (
    <div className="search">
      <form onSubmit={handleBtn}>
        <input type="text" id="searchbox" />
        <input type="submit" value="Search" />
      </form>
      <div className="results">
        <ul className="video-results">{videoItem}</ul>
      </div>
    </div>
  );
}

export default Search;
