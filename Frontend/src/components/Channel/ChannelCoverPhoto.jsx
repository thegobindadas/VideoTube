import React from 'react';


function ChannelCoverPhoto({ coverImage , alt }) {
  return (
    <div className="relative min-h-[150px] w-full pt-[16.28%]">
      <div className="absolute inset-0 overflow-hidden">
        <img src={coverImage} alt={alt} />
      </div>
    </div>
  )
}

export default ChannelCoverPhoto