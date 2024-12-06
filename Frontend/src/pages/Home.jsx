import React from 'react'
import { Sidebar, VideoGallery } from "../components/index"




function Home() {
    
    return (
        <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
            <Sidebar type="normal" />
            <VideoGallery />
        </div>
    );
}



export default Home