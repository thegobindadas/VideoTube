import React from 'react';
import { noPhotoBackground } from "../../utils/constants";


function ChannelCoverPhoto({ coverImage , alt }) {
  return (
    <div className="relative min-h-[150px] w-full pt-[16.28%]">
      <div className="absolute inset-0 overflow-hidden">
        <img src={coverImage || noPhotoBackground} alt={alt} />
      </div>
    </div>
  )
}


export default ChannelCoverPhoto