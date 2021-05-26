import React from 'react';
import Image from 'next/image';
import {
  SearchIcon,
  HomeIcon,
  UserGroupIcon,
  PlayIcon,
  ShoppingCartIcon,
  UsersIcon,
  PlusIcon,
} from '@heroicons/react/outline';
import {
  BellIcon,
  ChatAlt2Icon,
  ChevronDownIcon,
} from '@heroicons/react/solid';
import Icons from './Icons';
import { signOut, useSession } from 'next-auth/client';

function Header({ toggleChatWindow }) {
  const [session] = useSession();

  return (
    <div className='flex items-center p-2 shadow-lg w-full overflow-hidden'>
      <div className='flex items-center'>
        {/* left */}
        <div>
          <Image
            src='https://links.papareact.com/5me'
            width={40}
            height={40}
            layout='fixed'
          />
        </div>
        <div className='flex bg-gray-100 rounded-full p-2'>
          <SearchIcon className='h-6 w-6 text-gray-500' />
          <input
            type='text'
            placeholder='Search'
            className=' hidden md:inline mx-2 bg-transparent outline-none w-full'
          />
        </div>
      </div>
      <div className='flex flex-grow space-x-4 md:space-x-6 justify-center'>
        {/* center */}
        <Icons active Icon={HomeIcon} />
        <Icons Icon={UsersIcon} />
        <Icons Icon={PlayIcon} />
        <Icons Icon={ShoppingCartIcon} />
        <Icons Icon={UserGroupIcon} />
      </div>
      <div className='flex items-center flex-shrink-0'>
        {/* right */}
        <div
          className='flex items-center hover:bg-gray-200 p-1 rounded-full'
          onClick={signOut}>
          {/* image here */}
          <Image
            src={session.user.image}
            width={35}
            height={35}
            className='rounded-full'
            layout='fixed'
          />
          <h1 className='mx-1 font-semibold text-sm max-w-xs'>
            {session.user.name.split(' ', 1)}
          </h1>
        </div>
        <PlusIcon className='icon' />
        <ChatAlt2Icon className='icon' onClick={toggleChatWindow} />
        <BellIcon className='icon' />
        <ChevronDownIcon className='icon' />
      </div>
    </div>
  );
}

export default Header;
