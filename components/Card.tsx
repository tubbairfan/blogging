"use client";

import { useState } from "react";

interface InfoCardProps {
  title: string;
  description: string;
  placeholder?: string;
  onSearch?: (value: string) => void;
}

export default function Card({
  title,
  description,
  placeholder = "Search...",
  onSearch,
}: InfoCardProps) {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    if (onSearch) onSearch(e.target.value);
  };

  return (
    <div>
     
      <p className="text-2xl font-semibold mb-2 ">{title}</p>
      <p className="text-gray-600 mb-4">{description}</p>
      <input
        type="text"
        value={searchValue}
        onChange={handleSearch}
        placeholder={placeholder}
        className=" w-65 border border-gray-300 rounded-sm px-3 py-2 focus:outline-none "
      />
    </div>
  );
}
