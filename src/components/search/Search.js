import React from "react";
import { useState, useEffect } from "react";
import "./search.css";
import { useNavigate } from "react-router-dom";

function Search({ videos }) {
  const navigate = useNavigate();
  const [trendingVideo, setTrendingVideo] = useState([]);

  useEffect(() => {
    fetch(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=15&key=${process.env.REACT_APP_API_KEY}`
    )
      .then((res) => res.json())
      .then((response) => {
        console.log("we made it!");
        //DATA ARR
        let popVid = response.items;

        let trending = popVid.map((video, index) => {
          console.log(video);
          let popVidImg = video.snippet.thumbnails.medium.url;
          return (
            <li
              key={index}
              className="video"
              onClick={() => {
                navigate(`/video/${video.id}`);
              }}
            >
              <img src={popVidImg} alt="trending-video-thumbnail" />
              <h2>{video.snippet.title}</h2>
            </li>
          );
        });
        console.log(trending);
        setTrendingVideo(trending);
      }); //THEN CLOSING TAG
  }, []);
  useEffect(() => console.log(trendingVideo), [trendingVideo]);

  return (
    <div className="search">
      <div className="results">
        <ul className="video-results">
          {videos.length > 0 ? null : trendingVideo}

          {videos && videos}
        </ul>
      </div>
    </div>
  );
}

export default Search;
