import React from 'react'

function PlusIcon({ strokeWidth = 2, size = "h-5 w-5", color = "" }) {
  return (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={strokeWidth}
    stroke="currentColor"
    aria-hidden="true"
    className={`${size} ${color}`}>
        <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4.5v15m7.5-7.5h-15"></path>
</svg>
  )
}

export default PlusIcon
