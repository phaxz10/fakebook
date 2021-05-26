import React from 'react';

function Icons({ Icon, active }) {
  return (
    <div className='flex items-center h-10 md:px-4 lg:px-7 rounded-md md:hover:bg-gray-100 active:border-b-2 active:border-blue-500 group'>
      <Icon
        className={`h-7 md:h-5 text-gray-500 text-center group-hover:text-blue-500 mx-auto ${
          active && 'text-blue-600'
        }`}
      />
    </div>
  );
}

export default Icons;
