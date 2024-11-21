import React, { useCallback , useEffect, useRef, useState } from 'react'
import { Loader, ChannelPlaylistVideoCard } from "../index"
import playlistService from "../../services/playlistService"
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import {
  setLoading,
  setError,
  setPlaylistVideos,
  setPage,
  setHasMore,
  resetPlaylistVideos,
} from "../../store/playlistVideoSlice"


function ChannelPlaylistVideos({ playlistId }) {

  const dispatch = useDispatch();
  const { playlistVideos, loading, error, page, hasMore } = useSelector((state) => state.playlistVideos);
  const loader = useRef(null);
  const [totalPages, setTotalPages] = useState(1);


  const fetchPlaylistVideos = useCallback(async (page) => {
    try {
      dispatch(setLoading(true));            
                   
      const response = await playlistService.fetchPlaylistVideos(playlistId, page)

      const fetchedPlaylistVideos = response.data.playlistVideos;
      setTotalPages(response.data.totalPages);

      if (page >= response.data.totalPages) {
        dispatch(setHasMore(false));
      }

      dispatch(setPlaylistVideos(fetchedPlaylistVideos));
    } catch (err) {
      dispatch(setError(err.message));
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, playlistId]);


  useEffect(() => {
    if (page <= totalPages) {
      fetchPlaylistVideos(page);
    }
  }, [fetchPlaylistVideos, page, totalPages]);


  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading && page < totalPages) {
          dispatch(setPage(prev => prev + 1));
        }
      },
      {
        threshold: 1.0
      }
    );

    if (loader.current) observer.observe(loader.current);
    return () => observer.disconnect();
  }, [hasMore, loading, dispatch, page, totalPages]);


  useEffect(() => {
    return () => {
      dispatch(resetPlaylistVideos());
    };
  }, [dispatch]);




  if (error) return <p>Error: {error}</p>;

  

  return (
    <div className="flex w-full flex-col gap-y-4">
      {playlistVideos.length > 0 ? (
        playlistVideos.map((playlistVideo) => (
          <Link to={`/watch/${playlistVideo.videoId}`} key={playlistVideo.videoId}>
            <ChannelPlaylistVideoCard
              videoThumbnail={playlistVideo.videoThumbnail}
              videoDuration={playlistVideo.videoDuration}
              videoTitle={playlistVideo.videoTitle}
              videoViews={playlistVideo.videoViews}
              videoCreatedAt={playlistVideo.videoCreatedAt}
              videoOwnerId={playlistVideo.videoOwnerId}
              videoOwnerAvatar={playlistVideo.videoOwnerAvatar}
              videoOwnerName={playlistVideo.videoOwnerName}
              videoOwnerUsername={playlistVideo.videoOwnerUsername}
            />
          </Link>
        ))
      ) : (
        <p className="text-center text-gray-500">This playlist has no videos yet.</p>
      )}


      {/* Only show the loader if more videos are available */}
      {loading && hasMore && (
        <div className="text-center">
          <Loader />
        </div>
      )}

      {/* If there are no more videos, show a message */}
      {page >= totalPages && playlistVideos.length > 0 && !loading && (
        <p className="text-center text-gray-500">No more videos to load.</p>
      )}
      <div ref={loader} className="loader"></div>
    </div>
  )
}


export default ChannelPlaylistVideos