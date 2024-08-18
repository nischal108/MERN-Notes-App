import React from 'react';

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800">
      <img
        src="https://media.tenor.com/gZ9CSDfVg6kAAAAM/jethalal-tmkoc.gif" 
        alt="Error 404"
        className="w-1/2 md:w-1/4 mb-6 rounded-xl"
      />
      <h1 className="text-4xl font-bold mb-4">Oops! Page Not Found.</h1>
      <p className="text-lg mb-6">
      खो गए हम कहाँ
      </p>
      <p className="text-sm mb-8">
        Are you sure you didn't accidentally end up in the Upside-Down? 😅
      </p>
      <a
        href="/home"
        className="bg-blue-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-600 transition duration-300"
      >
        Return to Home
      </a>
    </div>
  );
};

export default ErrorPage;
