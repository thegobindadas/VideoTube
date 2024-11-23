import React from 'react'
import { SearchIcon } from "../../assets"

function SearchSubscribedChannel({ channelId }) {
  return (
    <div className="relative mb-2 rounded-lg bg-white py-2 pl-8 pr-3 text-black">
        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400">
            <SearchIcon strokeWidth="2" className="h-5 w-5" />
        </span>
        <input
            className="w-full bg-transparent outline-none"
            placeholder="Search" />
    </div>
  )
}

export default SearchSubscribedChannel
