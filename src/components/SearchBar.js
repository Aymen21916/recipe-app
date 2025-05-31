'use client'

// components/SearchBar.js
import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

export default function SearchBar({ onSearch, initialValue = '' }) {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for recipes (e.g. pasta, chicken, vegetarian)..."
          className="text-black w-full pl-12 pr-6 py-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent shadow-sm"
        />
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <FiSearch className="text-gray-400 text-xl" />
        </div>
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-amber-500 text-white rounded-full px-4 py-2 hover:bg-amber-600 transition-colors"
        >
          Search
        </button>
      </div>
      
      <div className="mt-3 flex flex-wrap justify-center gap-2">
        {['pasta', 'salad', 'dessert', 'vegetarian', 'breakfast'].map((term) => (
          <button
            key={term}
            type="button"
            onClick={() => onSearch(term)}
            className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm hover:bg-amber-200 transition-colors"
          >
            {term}
          </button>
        ))}
      </div>
    </form>
  );
}