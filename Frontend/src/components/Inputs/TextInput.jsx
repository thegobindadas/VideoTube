import React, { useId } from 'react'

function TextInput({
    label,
    type = "text",
    className = "",
    ...props
}, ref) {
    const id = useId()
    return (
        <div className="flex w-full flex-col items-start justify-start gap-2">
            {label && <label 
             className="text-xs text-slate-200" 
             htmlFor={id}>
                {label}
             </label>
            }
            <input
             type={type}
             className={`w-full border-[1px] border-white bg-black p-4 text-white placeholder:text-gray-500 ${className}`}
             ref={ref}
             {...props}
             id={id}
             autoComplete="false"
            />
        </div>
    )
}


export default React.forwardRef(TextInput)
