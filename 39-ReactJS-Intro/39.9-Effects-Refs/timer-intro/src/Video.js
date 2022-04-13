import React, { useState, useRef, useEffect } from "react";

function Video({ src = "https://media.giphy.com/media/KctGIT2JHvVRC7ESeR/giphy.mp4" }) {
  const [speed, setSpeed] = useState(1);
  const videoRef = useRef();
  useEffect(() => {
    // const video = document.querySelector("video");
    videoRef.current.playbackRate = speed;
    console.log(videoRef);
  }, [speed]);
  return (
    <div>
      <video muted autoPlay loop ref={videoRef}>
        <source src={src} />
      </video>
      <div>
        <button onClick={() => setSpeed((s) => s / 2)}>slow</button>
        <button onClick={() => setSpeed((s) => s * 2)}>fast</button>
        <p>Current speed: {speed}x</p>
      </div>
    </div>
  );
}

export default Video;
