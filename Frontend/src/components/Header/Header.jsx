import React from 'react'
import { Button } from "../index"
import { LogoIcon, SearchIcon, CloseIcon, LikedVideoIcon, ContentIcon, SupportIcon, SettingIcon } from "../../assets"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


function Header() {
    
    const userData = useSelector((state) => state.user.user)
    const navigate = useNavigate()
    
    const buttonsData = [
        {
            label: "Liked Videos",
            Icon: <LikedVideoIcon />
        },
        {
            label: "My Content",
            Icon: <ContentIcon />
        },
        {
            label: "Support",
            Icon: <SupportIcon />
        },
        {
            label: "Settings",
            Icon: <SettingIcon />
        },
    ]


  return (
    <header className="sticky inset-x-0 top-0 z-50 w-full border-b border-white bg-[#121212] px-4">
        <nav className="mx-auto flex max-w-7xl items-center py-2">
            <div className="mr-4 w-12 shrink-0 sm:w-16">
                <LogoIcon /> {/* logo-icon */}
            </div>

            

            <button className="ml-auto sm:hidden">
                <SearchIcon className="h-6 w-6" /> {/* search-icon - className="h-6 w-6" */}
            </button>
            <button className="group peer ml-4 flex w-6 shrink-0 flex-wrap gap-y-1.5 sm:hidden">
                <span className="block h-[2px] w-full bg-white group-hover:bg-[#ae7aff]"></span>
                <span className="block h-[2px] w-2/3 bg-white group-hover:bg-[#ae7aff]"></span>
                <span className="block h-[2px] w-full bg-white group-hover:bg-[#ae7aff]"></span>
            </button>
            <div className="fixed inset-y-0 right-0 flex w-full max-w-xs shrink-0 translate-x-full flex-col border-l border-white bg-[#121212] duration-200 hover:translate-x-0 peer-focus:translate-x-0 sm:static sm:ml-4 sm:w-auto sm:translate-x-0 sm:border-none">
                <div className="relative flex w-full items-center justify-between border-b border-white px-4 py-2 sm:hidden">
                    <span className="inline-block w-12">
                        <LogoIcon /> {/* logo-icon */}
                    </span>
                    <button className="inline-block w-8">
                        <CloseIcon /> {/* Close-Icon */}
                    </button>
                </div>

                <ul className="my-4 flex w-full flex-wrap gap-2 px-4 sm:hidden">
                    {buttonsData.map((button, index) => (
                        <li key={index} className="w-full">
                            <button className="flex w-full items-center justify-start gap-x-4 border border-white px-4 py-1.5 text-left hover:bg-[#ae7aff] hover:text-black focus:border-[#ae7aff] focus:bg-[#ae7aff] focus:text-black">
                                <span className="inline-block w-full max-w-[20px] group-hover:mr-4 lg:mr-4">
                                    {button.Icon}
                                </span>
                            <span> {button.label} </span>
                            </button>
                        </li>
                    ))}
                </ul>

                {
                    userData ? (
                        <div className="mb-8 mt-auto px-4 sm:mb-0 sm:mt-0 sm:px-0">
                            <button className="flex w-full gap-4 text-left sm:items-center">
                                <img
                                src={userData.avatar}
                                alt={userData.fullName}
                                className="h-16 w-16 shrink-0 rounded-full sm:h-12 sm:w-12" />
                                <div className="w-full pt-2 sm:hidden">
                                    <h6 className="font-semibold">{userData.fullName}</h6>
                                    <p className="text-sm text-gray-300">{`@${userData.username}`}</p>
                                </div>
                            </button>
                        </div>
                    ) : (
                        <div className="mb-8 mt-auto flex w-full flex-wrap gap-4 px-4 sm:mb-0 sm:mt-0 sm:items-center sm:px-0">
                            <button
                             onClick={() => navigate("login")}
                             className="w-full bg-[#383737] px-3 py-2 hover:bg-[#4f4e4e] sm:w-auto sm:bg-transparent">Log in</button>
                            <Button 
                             onClick={() => navigate("signup")}
                             className="mr-1 px-3 py-2 sm:w-auto"> Sign up </Button>
                        </div>
                    )
                }
            </div>
        </nav>
    </header>
  )
}

export default Header
