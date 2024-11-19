import React, { useState, useEffect } from 'react';
import { SavePlaylistButton, PlaylistDropdown } from '../index';
import playlistService from "../../services/playlistService"

const SaveToPlaylist = () => {
  
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [error, setError] = useState(null);


  const handleSaveClick = () => {
    setDropdownVisible((prev) => !prev);
  };

  const fetchMyPlaylists = async () => {
    try {
      const myPlaylists = await playlistService.getMyPlaylists();

      setPlaylists(myPlaylists.data);
    }catch (error) {
      console.error('Error while fetching playlists: ', error.message);
      setError(error.message || 'Failed to fetch playlists. Please try again later.');
    }
  };

  useEffect(() => {
    fetchMyPlaylists();

    return () => {
      setPlaylists([]);
    };
  }, []);
  


  if (error) {
    return <div>Error: {error}</div>;
  }


  return (
    <div className="relative block">
      <SavePlaylistButton onClick={handleSaveClick} />
      {isDropdownVisible && <PlaylistDropdown playlists={playlists} />}
    </div>
  );
};

export default SaveToPlaylist;
