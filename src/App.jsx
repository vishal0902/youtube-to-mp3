import { useRef, useState } from "react";
import axios from "axios";

import "./App.css";


function App() {

  const videoUrl = useRef(null);

  const [buttonState, setButtonState] = useState('Convert to MP3')

  function youtubeVideoIdParser(url) {      
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
}


  const handleSubmit = async (e) =>{
    e.preventDefault();
    console.log(videoUrl.current.value)
    const url = videoUrl.current.value
   
   
   
    
    const videoID = youtubeVideoIdParser(url)

    console.log(videoID)

   

    const options = {
      method: 'GET',
      url: 'https://youtube-mp3-download1.p.rapidapi.com/dl',
      params: {id: videoID},
      headers: {
        'X-RapidAPI-Key': '71a0316020msh212d65d7f956938p1dab34jsn8cdd18cb5ff3',
        'X-RapidAPI-Host': 'youtube-mp3-download1.p.rapidapi.com'
      }
    };
    
    try {
      const response = await axios.request(options);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }



  }

  return (
    <form onSubmit={handleSubmit} className="main">
      <div className="card text-center">
        <div className="card-header"><h2>Youtube to MP3 Converter</h2></div>
        <div className="card-body">
          <div className="card-title">Paste youtube video URL below</div>
          <div className="card-text">
          <input type='text' ref={videoUrl} style={{textIndent:'10px'}}  className="border text-black p-1 bg-white border-black border-3 w-100 rounded-4"/>

          </div>
          
        </div>
        <div className="card-footer text-body-secondary">
        <button type="submit" className="btn btn-primary">
            {buttonState}
          </button>
        </div>
      </div>
    </form>
  );
}

export default App;
