import React, { useState, useEffect } from 'react';
import { PlaylistItem } from '../index';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setError, setPlaylists, setPage, setHasMore, createPlaylist } from "../../store/myPlaylistSlice"
import playlistService from "../../services/playlistService"
import { handleError } from "../../utils/errorHandler"



const PlaylistModal = ({ videoId, closeModal }) => {

  const dispatch = useDispatch();
  const { playlists, loading, error, page, hasMore } = useSelector((state) => state.myPlaylists);
  const [newPlaylistName, setNewPlaylistName] = useState('');


  const fetchMyPlaylists = async () => {
    if (!hasMore || loading) return;

    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      const myPlaylists = await playlistService.getMyPlaylistNames({page});

      if (myPlaylists.success) {
        dispatch(setPlaylists(myPlaylists.data));
        dispatch(setPage(myPlaylists.data.currentPage + 1));
        dispatch(setHasMore(myPlaylists.data.currentPage < myPlaylists.data.totalPages));
      } else {
        throw new Error(myPlaylists.message || 'Failed to fetch playlists.');
      }
    } catch (error) {
      console.error('Error while fetching playlists: ', error.message);
      dispatch(setError(error.message || 'Failed to fetch playlists.'));
    } finally {
      dispatch(setLoading(false));
    }
  };


  useEffect(() => {
    fetchMyPlaylists();
  }, [page]);



  const handleCreatePlaylist = async () => {
    if (!newPlaylistName.trim()) {
      console.error('Playlist name cannot be empty');
      alert('Playlist name cannot be empty');
      return;
    }

    try {
        dispatch(setLoading(true));
        dispatch(setError(null));

        const res = await playlistService.createANewPlaylist({newPlaylistName});

        if (res.success) {
          dispatch(createPlaylist(res.data));
          setNewPlaylistName('');
        } else {
          throw new Error(res.message || 'Failed to create playlist.');
        }
    } catch (error) {
      console.error('Error creating playlist:', error.message);
      const errorMessage = handleError(error);
      dispatch(setError(errorMessage || error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };




  return (
    <div className="absolute right-0 top-full z-10 w-64 overflow-hidden rounded-lg bg-[#121212] p-4 shadow shadow-slate-50/30">
      <h3 className="mb-4 text-center text-lg font-semibold">Save to playlist</h3>
      {error && (
        <p className="mb-4 text-center text-sm text-red-500">
          {error}
        </p>
      )}
      <ul className="mb-4">
        {playlists.length > 0 ? (
          playlists.map((playlist) => (
            <PlaylistItem key={playlist._id} videoId={videoId} playlist={playlist} />
          ))
        ) : (
          <p className="text-center text-sm text-gray-400">
            {loading ? 'Loading playlists...' : 'No playlists found.'}
          </p>
        )}
      </ul>
      {hasMore && (
      <button
        className={`mb-4 w-full text-center text-sm ${
          loading ? 'text-gray-400' : 'text-[#ae7aff]'
        }`}
        onClick={fetchMyPlaylists}
        disabled={loading}
      >
        {loading ? 'Loading playlists...' : 'Load More'}
      </button>
      )}
      <div className="flex flex-col">
        <label
          htmlFor="playlist-name"
          className="mb-1 inline-block cursor-pointer"
        >
          Name
        </label>
        <input
          className="w-full rounded-lg border border-transparent bg-white px-3 py-2 text-black outline-none focus:border-[#ae7aff]"
          id="playlist-name"
          placeholder="Enter playlist name"
          value={newPlaylistName}
          onChange={(e) => setNewPlaylistName(e.target.value)}
        />
        <button
          className="mx-auto mt-4 rounded-lg bg-[#ae7aff] px-4 py-2 text-black"
          onClick={handleCreatePlaylist}
        >
          Create new playlist
        </button>
      </div>
      <button className="mt-4 text-white" onClick={closeModal}>
        Close
      </button>
    </div>
  );
};

export default PlaylistModal;
