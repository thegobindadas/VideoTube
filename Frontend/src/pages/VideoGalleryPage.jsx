import React from 'react'
import { Sidebar, VideoGallerySection } from "../components/index"




function VideoGalleryPage() {
    
    return (
        <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
            <Sidebar type="normal" />
            <VideoGallerySection />
        </div>
    );
}



export default VideoGalleryPage
