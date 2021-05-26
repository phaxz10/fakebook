import React from 'react';
import Image from 'next/image';

function SidebarRow({ title, Icon, src }) {
  return (
    <div className='transition delay-75 duration-300 ease-in-out transform hover:scale-105 font-semibold px-6 py-3 rounded-md p-2 flex items-center hover:bg-white'>
      {src && (
        <Image
          src={src}
          height={30}
          width={30}
          layout='fixed'
          className=' rounded-full'
        />
      )}
      {Icon && <Icon className=' h-6 w-6 text-blue-600' />}
      <h1 className='hidden md:inline-flex pl-2 font-semibold'>{title}</h1>
    </div>
  );
}

export default SidebarRow;
