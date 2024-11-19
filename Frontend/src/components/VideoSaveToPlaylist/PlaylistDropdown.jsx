import React, { useState } from 'react';
import { PlaylistCheckbox } from '../index';

const PlaylistDropdown = ({ playlists, onSave }) => {

  const [selectedPlaylists, setSelectedPlaylists] = useState({});
  const [newPlaylistName, setNewPlaylistName] = useState('');

  const handleCheckboxChange = (id) => {
    setSelectedPlaylists((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleCreatePlaylist = () => {
    if (newPlaylistName.trim()) {
      console.log('New playlist created:', newPlaylistName);
      setNewPlaylistName('');
    }
  };

  return (
    <div className="absolute right-0 top-full z-10 hidden w-64 overflow-hidden rounded-lg bg-[#121212] p-4 shadow shadow-slate-50/30 hover:block peer-focus:block">
      <h3 className="mb-4 text-center text-lg font-semibold">Save to playlist</h3>
      <ul className="mb-4">
        {playlists.map((playlist) => (
          <PlaylistCheckbox
            key={playlist._id}
            id={playlist._id}
            label={playlist.name}
            checked={selectedPlaylists[playlist._id] || false}
            onChange={() => handleCheckboxChange(playlist._id)}
          />
        ))}
      </ul>
      <div className="flex flex-col">
        <label htmlFor="playlist-name" className="mb-1 inline-block cursor-pointer">
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
          onClick={handleCreatePlaylist}
          className="mx-auto mt-4 rounded-lg bg-[#ae7aff] px-4 py-2 text-black"
        >
          Create new playlist
        </button>
      </div>
    </div>
  );
};


export default PlaylistDropdown;