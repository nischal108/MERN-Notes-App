import React from 'react';

const InputBox = ({ name, placeholder, label, onChange }) => {
  return (
    <div className='flex flex-col gap-1 mt-3'>
      {label && (
        <label htmlFor={name} className='text-base font-medium'>
          {label}
        </label>
      )}
      <input
        type='text'
        name={name}
        id={name}
        placeholder={placeholder}
        className='w-full px-3 py-1 rounded-md border border-gray-300 focus:ring focus:ring-blue-500 outline-none'
        onChange={onChange}
      />
    </div>
  );
};

export default InputBox;
