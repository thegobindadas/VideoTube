import React, { useId } from 'react'

function VideoDescriptionInput({
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
            <textarea
                type={type}
                className={`h-40 w-full resize-none border bg-transparent px-2 py-1 outline-none ${className}`}
                ref={ref}
                {...props}
                id={id}
            />
        </div>
    )
}


export default React.forwardRef(VideoDescriptionInput)