import React from 'react';

const PrimaryButton = ({ value, onClick }) => {
  return (
    <div className='w-full flex justify-center mt-3'>
      <button
        onClick={onClick}
        className='w-full flex items-center justify-center px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-md text-white text-center'
      >
        {value}
      </button>
    </div>
  );
};

export default PrimaryButton;
