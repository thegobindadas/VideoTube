import React from 'react'
import { useNavigate } from 'react-router-dom'
import { SidebarButton } from "../index"
import { HomeIcon, LikedVideosIcon, HistoryIcon, ContentIcon, CollectionIcon, SubscribersIcon, SupportIcon, SettingIcon } from "../../assets"

function Sidebar({ type }) {

    const navigate = useNavigate()

  return (
    <aside className={`group fixed inset-x-0 bottom-0 z-40 w-full shrink-0 border-t border-white bg-[#121212] px-2 py-2 sm:absolute sm:inset-y-0 sm:max-w-[70px] sm:border-r sm:border-t-0 sm:py-6 sm:hover:max-w-[250px] ${type === 'normal' ? 'lg:sticky lg:max-w-[250px]' : ''}`}>
        <ul className="flex justify-around gap-y-2 sm:sticky sm:top-[106px] sm:min-h-[calc(100vh-130px)] sm:flex-col">
            <li className="">
                <SidebarButton label="Home" sidebarType={type} Icon={HomeIcon} onClick={() => navigate("/")}/>
            </li>
            <li className="hidden sm:block">
                <SidebarButton label="Liked Videos" sidebarType={type} Icon={LikedVideosIcon} onClick={() => navigate("/like-videos")}/>
            </li>
            <li className="">
                <SidebarButton label="History" sidebarType={type} Icon={HistoryIcon} onClick={() => navigate("/watch-history")} />
            </li>
            <li className="hidden sm:block">
                <SidebarButton label="My Content" sidebarType={type} Icon={ContentIcon} onClick={() => navigate("/dashboard")} />
            </li>
            <li className="">
                <SidebarButton label="Collections" sidebarType={type} Icon={CollectionIcon} />
            </li>
            <li className="">
                <SidebarButton label="Subscribers" sidebarType={type} Icon={SubscribersIcon} />
            </li>
            <li className="hidden sm:block mt-auto">
                <SidebarButton label="Support" sidebarType={type} Icon={SupportIcon} />
            </li>
            <li className="hidden sm:block">
                <SidebarButton label="Settings" sidebarType={type} Icon={SettingIcon} />
            </li>
        </ul>
    </aside>
  )
}

export default Sidebar
