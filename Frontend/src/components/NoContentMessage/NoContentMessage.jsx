import React from 'react'

function NoContentMessage({ Icon , message }) {
  return (
    <div className="w-full max-w-sm text-center">
        <p className="mb-3 w-full">
            <span className="inline-flex rounded-full bg-[#E4D3FF] p-2 text-[#AE7AFF]">
                <span className="inline-block w-6">
                    <Icon />
                </span>
            </span>
        </p>
        <h5 className="mb-2 font-semibold">{message.title}</h5>
        <p>{message.text}</p>
    </div>
  )
}

export default NoContentMessage