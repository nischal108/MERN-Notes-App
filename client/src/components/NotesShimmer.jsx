import React from "react";

const NotesShimmer = () => {
  return (
    <div className="w-full mt-28 container px-5 flex items-center gap-4 mx-auto flex-wrap">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="relative w-[30%] bg-white rounded-lg p-3 drop-shadow-md cursor-pointer py-4 animate-pulse"
        >
          <div className="flex items-center justify-between">
            <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
          </div>
          <div className="h-4 bg-gray-300 rounded mb-2"></div>
          <div className="h-4 bg-gray-300 rounded mb-2"></div>
          <div className="mt-3 flex items-center justify-between">
            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
            <div className="flex items-center justify-center gap-4 text-md text-blue-400">
              <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
              <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
            </div>
          </div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"></div>
        </div>
      ))}
    </div>
  );
};

export default NotesShimmer;
