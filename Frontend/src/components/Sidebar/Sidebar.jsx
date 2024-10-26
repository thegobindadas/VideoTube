import React from 'react'
import { useNavigate } from 'react-router-dom'
import { SidebarButton } from "../index"
import { HomeIcon, LikedVideosIcon, HistoryIcon, ContentIcon, CollectionIcon, SubscribersIcon, SupportIcon, SettingIcon } from "../../assets"

function Sidebar() {

    const navigate = useNavigate()

  return (
    <aside className="group fixed inset-x-0 bottom-0 z-40 w-full shrink-0 border-t border-white bg-[#121212] px-2 py-2 sm:absolute sm:inset-y-0 sm:max-w-[70px] sm:border-r sm:border-t-0 sm:py-6 sm:hover:max-w-[250px] lg:sticky lg:max-w-[250px]">
        <ul className="flex justify-around gap-y-2 sm:sticky sm:top-[106px] sm:min-h-[calc(100vh-130px)] sm:flex-col">
            <li className="">
                <SidebarButton label="Home" Icon={HomeIcon} />
            </li>
            <li className="hidden sm:block">
                <SidebarButton label="Liked Videos" Icon={LikedVideosIcon} />
            </li>
            <li className="">
                <SidebarButton label="History" Icon={HistoryIcon} onClick={() => navigate("history")} />
            </li>
            <li className="hidden sm:block">
                <SidebarButton label="My Content" Icon={ContentIcon} />
            </li>
            <li className="">
                <SidebarButton label="Collections" Icon={CollectionIcon} />
            </li>
            <li className="">
                <SidebarButton label="Subscribers" Icon={SubscribersIcon} />
            </li>
            <li className="hidden sm:block mt-auto">
                <SidebarButton label="Support" Icon={SupportIcon} />
            </li>
            <li className="hidden sm:block">
                <SidebarButton label="Settings" Icon={SettingIcon} />
            </li>
        </ul>
    </aside>
  )
}

export default Sidebar
