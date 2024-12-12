import React, { useState } from 'react';


const ChannelTabs = ({ tabs, onTabChange }) => {
  
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || null);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    onTabChange(tabId);
  };


  return (
    <ul className="no-scrollbar sticky top-[66px] z-[2] flex flex-row gap-x-2 overflow-auto border-b-2 border-gray-400 bg-[#121212] py-2 sm:top-[82px]">
      {tabs.map((tab) => (
        <li key={tab.id} className="w-full">
          <button
            onClick={() => handleTabClick(tab.id)}
            className={`w-full border-b-2 ${activeTab === tab.id ? 'text-[#ae7aff] border-[#ae7aff] bg-white' : 'text-gray-400 border-transparent'} px-3 py-1.5`}
          >
            {tab.label}
          </button>
        </li>
      ))}
    </ul>
  );
};


export default ChannelTabs;