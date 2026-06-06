"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Props {
  value: string;
  onChange: (value: string) => void;
  onSearch?: () => void;
}

export default function SearchBar({
  value,
  onChange,
  onSearch,
}: Props) {
  return (
    <div className="relative w-full max-w-md mt-3 ms-3">
      <Search
        className="
          absolute
          left-3
          top-1/2
          -translate-y-1/2
          text-gray-400
          w-4
          h-4
        "
      />
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && onSearch) {
            onSearch();
          }
        }}
        placeholder="Search blogs..."
        className="pl-10"
      />
    </div>
  );
}