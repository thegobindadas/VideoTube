import React, { useState, useEffect } from 'react';
import { CheckIcon } from "../../assets";
import { handleError } from "../../utils/errorHandler";
import { useDispatch } from "react-redux";
import { saveVideoToPlaylist, removeVideoFromPlaylist } from "../../store/myPlaylistSlice";
import playlistService from "../../services/playlistService";


const PlaylistItem = ({ videoId, playlist }) => {
  
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleToggleVideo = async () => {
    setLoading(true);
    try {
      if (isChecked) {
        await playlistService.removeVideoFromPlaylist({ playlistId: playlist._id, videoId });
        dispatch(removeVideoFromPlaylist({ videoId, playlistId: playlist._id }));
      } else {
        await playlistService.addVideoToPlaylist({ playlistId: playlist._id, videoId });
        dispatch(saveVideoToPlaylist({ videoId, playlistId: playlist._id }));
      }
      setIsChecked(!isChecked);
    } catch (error) {
      const errorMessage = handleError(error);
      console.error(errorMessage || error.message);
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
            <CheckIcon />
          )}
        </span>
        {playlist.name}
      </label>
    </li>
  );
};


export default PlaylistItem;