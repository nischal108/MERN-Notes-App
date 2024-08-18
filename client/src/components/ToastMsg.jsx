import React from 'react';
import { BsCheck2Circle, BsExclamationCircle } from "react-icons/bs";

const ToastMsg = ({ type, message }) => {
  const icon = type === 'success' ? <BsCheck2Circle /> : <BsExclamationCircle />;
  const bgColor = type === 'success' ? 'bg-green-50' : 'bg-red-50';
  const iconColor = type === 'success' ? 'text-green-600' : 'text-red-600';
  const borderColor = type === 'success' ? 'border-green-600' : 'border-red-600';

  return (
    <div className={`w-64 p-3 h-16 ${bgColor} border-l-4 ${borderColor} float-right rounded-md shadow-2xl z-50 flex items-center gap-3 animate-slideIn`}>
      <div className={`text-3xl ${iconColor}`}>
        {icon}
      </div>
      <div>
        <p className='text-sm font-semibold text-gray-800'>{message}</p>
      </div>
    </div>
  );
}

export default ToastMsg;
