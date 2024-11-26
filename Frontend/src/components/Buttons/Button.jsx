import React from "react";

export default function Button({
    children,
    type = "button",
    bgColor = "",
    textColor = "",
    width="w-full",
    className = "p-3",
    ...props
}) {
    return (
        <button className={`bg-[#ae7aff] text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]
         ${bgColor} 
         ${textColor}
         ${width}
         ${className}`} 
         {...props}
         >
            {children}
        </button>
    );
}