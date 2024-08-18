import React from 'react';

const LoadingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800">
      <img
        src="https://media.tenor.com/-BYe4oFSjSAAAAAM/stephen-colbert-cant-find-it.gif"
        alt="Loading"
        className="w-1/2 md:w-1/4 mb-6 rounded-lg"
      />
      <h1 className="text-3xl font-bold mb-4">Hold On!</h1>
      <p className="text-lg mb-6">We're fetching your data, just a moment...</p>
      <p className="text-sm mb-8">If it feels like forever, maybe grab a snack? 🍿</p>
    </div>
  );
};

export default LoadingPage;
