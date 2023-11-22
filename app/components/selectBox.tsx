"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function SelectBox({ data }: any) {
  const [SearchInput, setSearchInput] = useState<string>("");
  const router = useRouter();
  const handleSearch = () => {
    router.push(`/restaurant/${SearchInput}`);
  };
  return (
    <div>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label className="block text-gray-500 font-bold md:text-right  pr-4">
            Search
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            id="inline-full-name"
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            onChange={(e) => setSearchInput(e.target.value)}
            type="text"
            value={SearchInput}
          />
        </div>
      </div>
      <button
        onClick={handleSearch}
        className="bg-blue-500 hover:bg-blue-700 text-white"
      >
        search
      </button>
    </div>
  );
}

export default SelectBox;
