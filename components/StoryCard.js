import Image from 'next/image';
import { PlusIcon } from '@heroicons/react/outline';

function StoryCard({ create, src, profile, name }) {
  return (
    <div className='relative md:rounded-lg md:bg-black mx-2 md:h-[198px] md:w-[111px] md:mx-1'>
      <div className='hidden md:inline-flex'>
        <Image
          src={src}
          layout='fill'
          className='rounded-lg object-cover opacity-80 transition delay-75 duration-300 ease-in-out transform hover:scale-105'
        />
      </div>
      {/* <div className=' h-14 w-14 md:absolute z-50 border-solid border-4 border-blue-500 rounded-full md:h-[40px] md:w-[40px] top-2 left-2'>
        <Image src={profile} layout='fill' className='rounded-full' />
      </div> */}

      <div
        className={`transition delay-75 duration-300 ease-in-out transform hover:scale-105 h-14 w-14 z-40  ${
          create
            ? 'md:relative md:left-1/4 md:top-1/3 md:h-[50px] md:w-[50px]'
            : 'md:absolute border-solid border-4 border-blue-500 rounded-full md:h-[40px] md:w-[40px] top-2 left-2'
        }`}>
        {create ? (
          <PlusIcon className='text-white rounded-full bg-blue-500 border-4 border-solid md:border-gray-600' />
        ) : (
          <Image src={profile} layout='fill' className='rounded-full' />
        )}
      </div>

      {/* <h1 className='hidden md:inline-flex absolute bottom-2 left-2 text-white font-semibold text-sm max-w-[100px]'>
        {name}
      </h1> */}

      <h1
        className={`hidden md:inline-flex absolute bottom-2 left-2 text-white font-semibold text-sm max-w-[100px] ${
          create &&
          ' text-base text-center bg-gray-600 p-4 pt-8 top-11 max-w-[111px] relative left-0 rounded-lg rounded-t-none leading-tight'
        }`}>
        {name}
      </h1>
    </div>
  );
}

export default StoryCard;
