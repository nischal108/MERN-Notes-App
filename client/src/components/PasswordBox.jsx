import React, { useState } from 'react';
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa';

const PasswordBox = ({ name, placeholder, label, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className='flex flex-col gap-1 mt-3'>
      {label && (
        <label htmlFor={name} className='text-base font-medium'>
          {label}
        </label>
      )}
      <div className='relative w-full'>
        <input
          type={showPassword ? 'text' : 'password'}
          name={name}
          id={name}
          placeholder={placeholder}
          className='w-full px-3 py-1 pr-11 rounded-md border border-gray-300 focus:ring focus:ring-blue-500 outline-none'
          onChange={onChange}
        />
        <button
          type='button'
          onClick={() => setShowPassword(!showPassword)}
          className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700'
        >
          {showPassword ? <FaRegEye size='1.5em' /> : <FaRegEyeSlash size='1.5em' />}
        </button>
      </div>
    </div>
  );
};

export default PasswordBox;
