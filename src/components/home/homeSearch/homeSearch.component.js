import { SearchIcon } from '@heroicons/react/solid';

export function HomeSearchComponent() {
  return (
    <div className="mt-10">
      <div className="flex-1 flex items-center justify-center px-2">
        <div className="max-w-lg w-full">
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              id="search"
              name="search"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Search"
              type="search"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
