import React, { useId } from 'react'

function VideoTitleInput({
    label,
    type = "text",
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
                className={`w-full border bg-transparent px-2 py-1 outline-none ${className}`}
                ref={ref}
                {...props}
                id={id}
            />
        </div>
    )
}


export default React.forwardRef(VideoTitleInput)