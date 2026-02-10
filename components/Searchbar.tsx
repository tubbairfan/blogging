"use client";

interface SearchbarProps {
  title: string;
  description: string;
  placeholder?: string;
  value: string;
  onChange: (val: string) => void;
}

export default function Searchbar({
  title,
  description,
  placeholder = "Search...",
  value,
  onChange,
}: SearchbarProps) {
  return (
    <div>
      <p className="text-2xl font-semibold mb-1">{title}</p>
      <p className="text-gray-600 mb-3">{description}</p>

      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full max-w-md border border-gray-300 rounded-sm px-3 py-2 focus:outline-none"
      />
    </div>
  );
}
