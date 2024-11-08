import React, { useId, useState } from 'react'

function AvatarInput({
    type = "file",
    error,
    ...props
}, ref) {
    const id = useId()
    return (
        <div className="flex w-full items-center justify-center">
            <input
             className="hidden"
             id={id}
             hidden=""
             type={type}
             ref={ref}
             {...props}
            />
            <label
             htmlFor={id}
             className="relative flex aspect-square h-24 w-24 cursor-pointer items-center justify-center overflow-visible rounded-full border-4 border-[#ae7aff] p-1">
                <div className="flex h-full w-full items-center justify-center rounded-full">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                        className="h-8 w-8 text-white">
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4.5v15m7.5-7.5h-15"></path>
                    </svg>
                </div>
                <span className="absolute bottom-0 right-0 flex aspect-square h-5 w-5 items-center justify-center rounded-full bg-[#ae7aff] p-1">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                        className="h-3 w-3 text-black">
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4.5v15m7.5-7.5h-15"></path>
                    </svg>
                </span>
            </label>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
}


export default React.forwardRef(AvatarInput)
