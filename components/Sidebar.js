import { useSession } from 'next-auth/client';
import React from 'react';
import SidebarRow from './SidebarRow';
import {
  ChevronDownIcon,
  ShoppingBagIcon,
  UserGroupIcon,
} from '@heroicons/react/outline';
import {
  CalendarIcon,
  ClockIcon,
  DesktopComputerIcon,
  UsersIcon,
} from '@heroicons/react/solid';

function Sidebar() {
  const [session, loading] = useSession(useSession);
  return (
    <div className='max-w-[600px] md:min-w-[250px]'>
      <SidebarRow title={session.user.name} src={session.user.image} />
      <SidebarRow Icon={UsersIcon} title='Friends' />
      <SidebarRow title='Groups' Icon={UserGroupIcon} />
      <SidebarRow title='Marketplace' Icon={ShoppingBagIcon} />
      <SidebarRow title='Watch' Icon={DesktopComputerIcon} />
      <SidebarRow title='Events' Icon={CalendarIcon} />
      <SidebarRow title='Memories' Icon={ClockIcon} />
      <SidebarRow title='See More' Icon={ChevronDownIcon} />
    </div>
  );
}

export default Sidebar;
