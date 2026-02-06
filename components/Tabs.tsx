"use client";

import { useState } from "react";
interface TopActionBarProps {
  tabs?: string[];
 
}

export default function FilterWrapper({
  tabs = ["ALL", "Active", "Draft"],
}: TopActionBarProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div className="flex items-center justify-between ">

      <div className="flex bg-[#F4F4F5] rounded-md w-max mt-5 p-1">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`
        px-4 py-2 font-medium text-gray-700 transition-colors
        rounded-xs
        ${activeTab === tab
                ? "bg-white shadow-inner"
                : "hover:bg-white hover:shadow-inner"
              }
      `}
          >
            {tab}
          </button>
        ))}
      </div>
     
    </div>
  );
}
