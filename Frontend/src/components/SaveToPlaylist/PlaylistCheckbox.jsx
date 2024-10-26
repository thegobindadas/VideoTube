import React from 'react';

const PlaylistCheckbox = ({ _id, label, checked, onChange }) => (
    <li className="mb-2 last:mb-0">
        <label className="group/label inline-flex cursor-pointer items-center gap-x-3" htmlFor={_id}>
            <input
                type="checkbox"
                className="peer hidden"
                id={_id}
                checked={checked}
                onChange={onChange}
            />
            <span className={`inline-flex h-4 w-4 items-center justify-center rounded-[4px] border border-transparent bg-white text-white
                group-hover/label:border-[#ae7aff] peer-checked:border-[#ae7aff] peer-checked:text-[#ae7aff]`}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="3"
                    stroke="currentColor"
                    aria-hidden="true"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                    ></path>
                </svg>
            </span>
            {label}
        </label>
    </li>
);

export default PlaylistCheckbox;
