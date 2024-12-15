import React, { useState, useEffect, useCallback } from 'react';
import { SearchIcon, CloseIcon } from "../../assets";


function SearchSubscribedChannel({ onSearch }) {

  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");


  // Debounce search query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, 300); // Adjust debounce delay as needed (e.g., 300ms)
    return () => clearTimeout(handler);
  }, [query]);

  // Trigger search on debounced query
  useEffect(() => {
    onSearch(debouncedQuery);
  }, [debouncedQuery, onSearch]);

  const clearSearch = useCallback(() => {
    setQuery("");
    onSearch(""); // Clear search results and show subscribedChannels
  }, [onSearch]);

  return (
    <div className="relative mb-2 rounded-lg bg-white py-2 pl-8 pr-3 text-black shadow-md">
      {/* Search Icon */}
      <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400">
        <SearchIcon strokeWidth="2" className="h-5 w-5" />
      </span>

      {/* Input Field */}
      <input
        type="text"
        className="w-full bg-transparent outline-none placeholder-gray-500"
        placeholder="Search subscribed channels"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Search subscribed channels"
      />

      {/* Clear Button */}
      {query && (
        <button
          type="button"
          className="inline-block w-8 absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          onClick={clearSearch}
          aria-label="Clear search"
        >
          <CloseIcon stroke="#808080" className="h-6 w-6" />
        </button>
      )}
    </div>
  );
}


export default SearchSubscribedChannel