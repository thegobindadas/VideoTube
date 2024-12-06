import React from 'react';


function VideoPlayer({ videoUrl }) {
  return (
    <div className="relative mb-4 w-full pt-[56%]">
      <div className="absolute inset-0">
        <video 
          className="h-full w-full" 
          controls 
          autoPlay 
          muted 
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      </div>
    </div>
  )
}


export default VideoPlayer