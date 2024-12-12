import React, { useState } from 'react';
import { AddFileIcon } from "../../assets";
import { PlaylistModal } from '../index';


const PlaylistSaveButton = ({ videoId }) => {

  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => setIsOpen(!isOpen);


  return (
    <div className="relative block">
      <button className="peer flex items-center gap-x-2 rounded-lg bg-white px-4 py-1.5 text-black" onClick={toggleModal}>
        <span className="inline-block w-5">
          <AddFileIcon />
        </span>
        Save
      </button>
      {isOpen && <PlaylistModal videoId={videoId} closeModal={toggleModal} />}
    </div>
  );
};


export default PlaylistSaveButton;