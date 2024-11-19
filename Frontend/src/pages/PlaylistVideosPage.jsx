import React from 'react'
import { Sidebar, ChannelPlaylist } from "../components/index"


function PlaylistVideosPage() {
  return (
    <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
        <Sidebar type="normal" />
        <ChannelPlaylist />
    </div>
  )
}


export default PlaylistVideosPage