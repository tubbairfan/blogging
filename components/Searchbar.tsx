"use client";

interface InfoCardProps {
  title: string;
  description: string;
  placeholder?: string;
}

export default function Searchbar({
  title,
  description,
  placeholder = "Search...",
}: InfoCardProps) {
  return (
    <div>
      <p className="text-2xl font-semibold mb-1">{title}</p>
      <p className="text-gray-600 mb-3">{description}</p>

      <input
        type="text"
        placeholder={placeholder}
        className="w-65 max-w-md border border-gray-300 rounded-sm px-3 py-2 focus:outline-none"
      />
    </div>
  );
}
