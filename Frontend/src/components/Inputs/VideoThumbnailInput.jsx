import React, { useId } from 'react'

function VideoThumbnailInput({
    label,
    type = "file",
    className = "",
    ...props
}, ref) {
    const id = useId()
    return (
        <div className="w-full">
            {label && <label 
                className="mb-1 inline-block" 
                htmlFor={id}>
                    {label}
                    <sup>*</sup>
                </label>
            }
            <input
                type={type}
                className={`w-full border p-1 file:mr-4 file:border-none file:bg-[#ae7aff] file:px-3 file:py-1.5 ${className}`}
                ref={ref}
                {...props}
                id={id}
            />
        </div>
    )
}


export default React.forwardRef(VideoThumbnailInput)