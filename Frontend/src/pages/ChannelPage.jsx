import React from 'react';
import { useParams } from 'react-router-dom';
import { Sidebar, Channel } from "../components";


function ChannelPage() {

  const { username } = useParams();


  return (
    <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
      <Sidebar type="normal" />
      <Channel username={username} />
    </div>
  )
}


export default ChannelPage