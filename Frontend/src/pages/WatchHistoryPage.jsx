import React from 'react'
import { Sidebar, WatchHistory } from "../components/index"



function WatchHistoryPage() {
    
    return (
        <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
            <Sidebar type="normal" />
            <WatchHistory />
        </div>
    );
}






export default WatchHistoryPage