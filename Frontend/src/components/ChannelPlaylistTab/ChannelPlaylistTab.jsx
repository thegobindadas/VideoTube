import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Loader, NoContentMessage, ChannelPlaylistTabCard } from "../index"
import { CollectionIcon } from "../../assets"
import { setPlaylists, setLoading, setError, setPage, setHasMore, resetPlaylists } from '../../store/userPlaylistsSlice';
import { useDispatch, useSelector } from 'react-redux';
import playlistService from "../../services/playlistService"
import { Link } from 'react-router-dom';


function ChannelPlaylistTab({ channelId }) {

  const dispatch = useDispatch();
    const { playlists, loading, error, page, hasMore } = useSelector((state) => state.userPlaylists);
    const loader = useRef(null);
    const [loadingMore, setLoadingMore] = useState(false);
    const [totalPages, setTotalPages] = useState(1);

  const noContentMessages = {
    title: "No playlist created",
    text: "There are no playlist created on this channel.",
  };



  const fetchChannelPlaylists = useCallback(async () => {
    try {
      if (page === 1) {
        dispatch(setLoading(true));
      } else {
        setLoadingMore(true);
      }

      const response = await playlistService.getUserPlaylists(channelId, page);
      const fetchedChannelPlaylists = response.data.playlists;
      setTotalPages(response.data.totalPages);
      dispatch(setHasMore(page < response.data.totalPages));
      dispatch(setPlaylists(fetchedChannelPlaylists));
    } catch (err) {
      dispatch(setError(err.message));
    } finally {
      dispatch(setLoading(false));
      setLoadingMore(false);
    }
  }, [channelId, page, dispatch]);

  

  useEffect(() => {
    if (page <= totalPages) {
      fetchChannelPlaylists();
    }
  }, [fetchChannelPlaylists, page, totalPages]);


  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading && !loadingMore) {
          dispatch(setPage(page + 1));
        }
      },
      { threshold: 1.0 }
    );

    if (loader.current) observer.observe(loader.current);
    return () => observer.disconnect();
  }, [hasMore, loading, loadingMore, dispatch, page]);



  useEffect(() => {
    dispatch(resetPlaylists());
    dispatch(setPage(1));
  }, [channelId, dispatch]);





  if (loading) return <Loader msg="playlists" />;
  if (error) return <div>Error: {error}</div>;
  if (!playlists.length) {
    return (
      <div className="flex justify-center p-4">
        <NoContentMessage Icon={CollectionIcon} message={noContentMessages} />
      </div>
    );
  }

  return (
    <div className="grid gap-4 pt-2 sm:grid-cols-[repeat(auto-fit,_minmax(400px,_1fr))]">
      {playlists.map((playlist) => (
        <ChannelPlaylistTabCard 
          key={playlist._id} 
          name={playlist.name}
          description={playlist.description}
          createdAt={playlist.createdAt}
          totalVideos={playlist.totalVideos}
          thumbnail={playlist.firstVideoThumbnail}
        />
      ))}
      {page >= totalPages && (
        <p className="text-center text-gray-500">No more videos to load.</p>
      )}
      <div ref={loader} className="loader"></div>
    </div>
  )
}

export default ChannelPlaylistTab