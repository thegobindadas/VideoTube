import React, { useId } from 'react'

function VideoFileInput({
    label="Select Files",
    type = "file",
    ...props
}, ref) {
    const id = useId()
    return (
        <div className="w-full border-2 border-dashed px-4 py-12 text-center">
            <span className="mb-4 inline-block w-24 rounded-full bg-[#E4D3FF] p-4 text-[#AE7AFF]">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"></path>
                </svg>
            </span>
            <h6 className="mb-2 font-semibold">Drag and drop video files to upload</h6>
            <p className="text-gray-400">Your videos will be private untill you publish them.</p>

            <label
                htmlFor={id}
                className="group/btn mt-4 inline-flex w-auto cursor-pointer items-center gap-x-2 bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]">
                    
                    <input
                        type={type}
                        className="sr-only"
                        ref={ref} 
                        {...props}
                        id={id}
                    />

                Select Files
            </label>

        </div>
    )
}


export default React.forwardRef(VideoFileInput)