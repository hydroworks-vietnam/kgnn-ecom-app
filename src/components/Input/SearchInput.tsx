import { useState } from 'react';
import { SearchIcon } from 'lucide-react';

const SearchInput = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSearch = () => {
    setIsSearchOpen(prev => !prev);
  };

  return (
    <>
      {/* Desktop & Mobile Trigger: Search Icon */}
      <button
        onClick={toggleSearch}
        aria-label="Open search"
        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-200"
      >
        <SearchIcon className="w-6 h-6 text-gray-500" />
      </button>

      {/* Search Overlay (Shared for Desktop & Mobile) */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-16 animate-slide-down">
          <div className="w-full max-w-2xl mx-4 animate-fly-in">
            <div className="relative flex items-center bg-gray-100 rounded-full shadow-md">
              <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search"
                className="w-full py-3 pl-12 pr-4 rounded-full text-gray-900 bg-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:bg-white focus:shadow-lg transition-all duration-200"
                autoFocus
              />
              <button
                onClick={toggleSearch}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchInput;