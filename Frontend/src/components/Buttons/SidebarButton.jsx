import React from 'react'

function SidebarButton({
        label,
        sidebarType,
        type = "button",
        Icon,
        ...props
    }) {
  return (
    <button className={`flex flex-col items-center justify-center border-white py-1 focus:text-[#ae7aff] sm:w-full sm:flex-row sm:border sm:p-1.5 sm:hover:bg-[#ae7aff] sm:hover:text-black sm:focus:border-[#ae7aff] sm:focus:bg-[#ae7aff] sm:focus:text-black sm:group-hover:justify-start sm:group-hover:px-4 lg:justify-start lg:px-4 `}
    {...props}
    >
      <span className="inline-block w-5 shrink-0 sm:group-hover:mr-4 lg:mr-4">
        <Icon />
      </span>
      <span className={`block sm:hidden sm:group-hover:inline ${sidebarType === 'normal' ? 'lg:inline' : ''}`}>{label}</span>
    </button>
  )
}

export default SidebarButton
