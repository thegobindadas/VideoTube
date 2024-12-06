import React, { useState } from 'react';
import { PlaylistModal } from '../index';

const PlaylistSaveButton = ({ videoId }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);

  return (
    <div className="relative block">
      <button className="peer flex items-center gap-x-2 rounded-lg bg-white px-4 py-1.5 text-black" onClick={toggleModal}>
        <span className="inline-block w-5">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"></path>
          </svg>
        </span>
        Save
      </button>
      {isOpen && <PlaylistModal videoId={videoId} closeModal={toggleModal} />}
    </div>
  );
};


export default PlaylistSaveButton;