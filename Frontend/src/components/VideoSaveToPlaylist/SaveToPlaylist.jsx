import React, { useState } from 'react';
import { SavePlaylistButton, PlaylistDropdown } from '../index';


const SaveToPlaylist = () => {
  
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  
  const playlists = [
    { id: '1', name: 'Collections' },
    { id: '2', name: 'JavaScript Basics' },
    { id: '3', name: 'C++ Tuts' },
    { id: '4', name: 'Feel Good Music' },
    { id: '5', name: 'Ed Sheeran' },
    { id: '6', name: 'Python' },
  ];

  
  const handleSaveClick = () => {
    setDropdownVisible((prev) => !prev);
  };


  return (
    <div className="relative block">
      <SavePlaylistButton onClick={handleSaveClick} />
      {isDropdownVisible && <PlaylistDropdown playlists={playlists} />}
    </div>
  );
};

export default SaveToPlaylist;
