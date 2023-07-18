import { useRef, useState } from "react";
import axios from "axios";


function Converter() {
  const videoUrl = useRef(null);

  const [isLoading, setIsLoading] = useState(false);

  const [videoTitle, setVideoTitle] = useState("");
  const [downloadLink, setDownloadLink] = useState("");
  const [displayForm, setDisplayForm] = useState(true);

  function youtubeVideoIdParser(url) {
    var regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return match && match[7].length == 11 ? match[7] : false;
  }

  function editTitle(title) {
    return title.slice(0, 20) + "...";
  }

  const handleReset = () => {
    setVideoTitle("");
    setDownloadLink("");
    setDisplayForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const url = videoUrl.current.value;
    const videoID = youtubeVideoIdParser(url);
    videoUrl.current.value = "";
    setDisplayForm(false);
   

    const options = {
      method: "GET",
      url: "https://youtube-mp36.p.rapidapi.com/dl",
      params: { id: videoID },
      headers: {
        "X-RapidAPI-Key": "71a0316020msh212d65d7f956938p1dab34jsn8cdd18cb5ff3",
        "X-RapidAPI-Host": "youtube-mp36.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      await setVideoTitle(editTitle(response.data.title));
      await setDownloadLink(response.data.link);
      await setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="Converter">
      {displayForm && (
        <form onSubmit={handleSubmit} className="main">
          <div className="card text-center rounded-2">
            <div className="card-header">
              <h2
                style={{
                  backgroundColor: "purple",
                  color: "white",
                  padding: "20px",
                }}
                className="rounded-4">
                Youtube to MP3 Converter
              </h2>
            </div>
            <div className="card-body">
              <div className="card-title h5">Paste youtube video URL below</div>
              <div className="card-text">
                <input
                  type="text"
                  ref={videoUrl}
                  style={{ textIndent: "10px" }}
                  className="border text-black p-1 border-3 w-100 rounded-2"
                />
              </div>
            </div>
            <div className="card-footer text-body-secondary">
              <button
                type="submit"
                style={{ backgroundColor: "purple" }}
                className="btn btn-primary border border-0">
                Convert to MP3
              </button>
            </div>
          </div>
        </form>
      )}

      {isLoading && (
        <>
        <img src='loading.webp' height='100' width='100'/>
        <p
          style={{ backgroundColor: "purple", color: "white" }}
          class="btn card btn-danger">
          Converting...
        </p>
        </>
      )}

      {videoTitle && (
        <div class="card rounded-2 c">
          <h5
            style={{ backgroundColor: "purple", color: "white" }}
            class="rounded-2 card-header">
            Converted MP3 Audio
          </h5>
          <div class="card-body">
            <h5 class="card-title">{videoTitle}</h5>
            <p class="card-text">Click below to download MP3</p>
            <a
              href={downloadLink}
              style={{ backgroundColor: "purple" }}
              class="btn text-white btn-primary border border-0">
              Download
            </a>
            <button
              onClick={handleReset}
              style={{ backgroundColor: "purple", marginLeft: "20px" }}
              class="btn border border-0 text-white btn-primary">
              Back to Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Converter;
