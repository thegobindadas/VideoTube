import React from 'react'
import { Sidebar, VideoDetails, RecommendedVideoList  } from "../components/index"

function VideoPage() {
  return (
    <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
      <Sidebar />

      <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0">
        <div className="flex w-full flex-wrap gap-4 p-4 lg:flex-nowrap">
          <VideoDetails />
          <RecommendedVideoList />
        </div>
      </section>
  </div>
  )
}

export default VideoPage
