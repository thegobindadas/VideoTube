import React, { useState, useEffect } from 'react';
import playlistService from "../../services/playlistService"
import { useDispatch } from "react-redux";
import { saveVideoToPlaylist, removeVideoFromPlaylist } from "../../store/myPlaylistSlice";

const PlaylistItem = ({ videoId, playlist }) => {
  
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleToggleVideo = async () => {
    setLoading(true);
    try {
      if (isChecked) {
        await playlistService.removeVideoFromPlaylist(videoId, playlist._id);
        dispatch(removeVideoFromPlaylist({ videoId, playlistId: playlist._id }));
      } else {
        await playlistService.addVideoToPlaylist(videoId, playlist._id);
        dispatch(saveVideoToPlaylist({ videoId, playlistId: playlist._id }));
      }
      setIsChecked(!isChecked);
    } catch (error) {
      console.error("Failed to toggle video in playlist:", error.message);
    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
    const isVideoInPlaylist = playlist.videos && playlist.videos.includes(videoId);  
    setIsChecked(isVideoInPlaylist);
  }, [playlist, videoId]);




  return (
    <li className="mb-2 last:mb-0">
      <label className="group/label inline-flex cursor-pointer items-center gap-x-3" htmlFor={playlist._id}>
        <input
          type="checkbox"
          className="peer hidden"
          id={playlist._id}
          checked={isChecked}
          onChange={handleToggleVideo}
          aria-checked={isChecked}
          disabled={loading}
        />
        <span
          className={`inline-flex h-4 w-4 items-center justify-center rounded-[4px] border bg-white peer-checked:border-[#ae7aff] peer-checked:text-[#ae7aff] ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isChecked && !loading && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="3"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
            </svg>
          )}
        </span>
        {playlist.name}
      </label>
    </li>
  );
};


export default PlaylistItem;