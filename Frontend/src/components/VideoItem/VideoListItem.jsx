import React from 'react'

function VideoListItem({ _id, thumbnail, duration, avatar, title, views, createdAt, author, description }) {

  function convertSeconds(secondsInput) {
    const hours = Math.floor(secondsInput / 3600);
    const minutes = Math.floor((secondsInput % 3600) / 60);
    const seconds = Math.floor(secondsInput % 60);
  
    // If hours are greater than 0, include hours in the output
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else {
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
  }
  const videoDuration = convertSeconds(duration);


  function getTimeAgo(inputTime) {
    const now = new Date();
    const past = new Date(inputTime);
    const diffInSeconds = Math.floor((now - past) / 1000);
  
    const minute = 60;
    const hour = 60 * minute;
    const day = 24 * hour;
    const week = 7 * day;
    const month = 30 * day;
  
    if (diffInSeconds < minute) {
      return 'Just now';
    } else if (diffInSeconds < hour) {
      const minutes = Math.floor(diffInSeconds / minute);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < day) {
      const hours = Math.floor(diffInSeconds / hour);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < week) {
      const days = Math.floor(diffInSeconds / day);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < month) {
      const weeks = Math.floor(diffInSeconds / week);
      return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    } else {
      const months = Math.floor(diffInSeconds / month);
      return `${months} month${months > 1 ? 's' : ''} ago`;
    }
  }
  const timeAgo = getTimeAgo(String(createdAt))


  return (
    <div className="w-full max-w-3xl gap-x-4 md:flex">
      <div className="relative mb-2 w-full md:mb-0 md:w-5/12">
        <div className="w-full pt-[56%]">
          <div className="absolute inset-0">
            <img
              src={thumbnail}
              alt={title}
              className="h-full w-full" />
          </div>
          <span className="absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-sm">{videoDuration}</span>
        </div>
      </div>
      <div className="flex gap-x-2 md:w-7/12">
        <div className="h-10 w-10 shrink-0 md:hidden">
          <img
            src={avatar}
            alt={author}
            className="h-full w-full rounded-full" />
        </div>
        <div className="w-full">
          <h6 className="mb-1 font-semibold md:max-w-[75%]">{title}</h6>
          <p className="flex text-sm text-gray-200 sm:mt-3">{views} Views · {timeAgo}</p>
          <div className="flex items-center gap-x-4">
            <div className="mt-2 hidden h-10 w-10 shrink-0 md:block">
              <img
                src={avatar}
                alt={author}
                className="h-full w-full rounded-full" />
            </div>
            <p className="text-sm text-gray-200">{author}</p>
          </div>
          <p className="mt-2 hidden text-sm md:block">{description}</p>
        </div>
      </div>
    </div>
  )
}

export default VideoListItem
