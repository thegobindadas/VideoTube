import React, { useId, useState } from 'react'
import { PlusIcon } from "../../assets"

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
                    <PlusIcon strokeWidth="1.5" size="h-8 w-8" color="text-white" />
                </div>
                <span className="absolute bottom-0 right-0 flex aspect-square h-5 w-5 items-center justify-center rounded-full bg-[#ae7aff] p-1">  
                    <PlusIcon strokeWidth="1.5" size="h-3 w-3" color="text-black" />
                </span>
            </label>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
}


export default React.forwardRef(AvatarInput)
