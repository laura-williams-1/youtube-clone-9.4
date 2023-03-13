import { useState, useEffect } from "react";
import '../App.css'

function Home() {

    const [trendingVideo, setTrendingVideo] = useState();

    useEffect(() => {
            fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=15&key=${process.env.REACT_APP_API_KEY}`)
            .then((res) => res.json())
            .then((response) => {
                console.log('we made it!', )
                //DATA ARR
                let popVid = response.items
        
                let trending =   popVid.map((video, index) => {
                    let popVidImg = video.snippet.thumbnails.medium.url
                        return <li key={index}>
                                    <img src={popVidImg} alt='video-thumbnail'/>
                                    <h2>{video.snippet.title}</h2>
                                </li>
                         })
                    setTrendingVideo(trending)
                    console.log(trendingVideo);
                })//THEN CLOSING TAG
           
    },[])



    return (
        <div className="">
            <ul className="trending">
                {trendingVideo}
            </ul>
        </div>
    )
}

export default Home