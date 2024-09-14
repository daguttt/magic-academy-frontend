'use client'

import { useState } from 'react';
import { House, MapPin, Album, Search, User } from 'lucide-react';
import SideBarButton from './side-bar-button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from '@/lib/utils';

export default function SideBar() {
  const [activeIcon, setActiveIcon] = useState<number | null>(null);
  const [openBar, setOpenBar] = useState(false);

  const handleMenuToggle = () => {
    setOpenBar(prevOpenBar => !prevOpenBar);
  };

  const handleActiveIcon = (index: number) => {
    setActiveIcon(index);
  };

  const classIcons = `${openBar ? 'w-0' : 'w-6'} transition-all duration-300`;

  const icons = [
    { icon: <House className={classIcons} />, tooltip: 'Home' },
    { icon: <MapPin className={classIcons} />, tooltip: 'Map' },
    { icon: <Album className={classIcons} />, tooltip: 'Albums' },
    { icon: <Search className={classIcons} />, tooltip: 'Search' },
    { icon: <User className={classIcons} />, tooltip: 'Profile' }
  ];

  return (
    <>
      <div className="p-2 bg-gray-900 border-red-600">
        <SideBarButton openBar={openBar} onToggle={handleMenuToggle} />
      </div>

      <aside
        id="navBar"
        className={`float-left h-screen transition-all duration-300 ${openBar ? 'w-0' : 'w-16'} bg-gray-900 text-white`}
      >
        <div className="navigation">
          <ul className="list-none">
            {icons.map((item, index) => (
              <li
                key={item.tooltip}
                className="relative flex items-center justify-center rounded-lg cursor-pointer hover:bg-gray-500"
                onClick={() => handleActiveIcon(index)}
              >
                <TooltipProvider delayDuration={90} skipDelayDuration={200}>
                  <Tooltip>
                    <TooltipTrigger className='p-3.5 pr-4 pl-4'>
                      <span className={`transition-colors duration-50 ${activeIcon === index ? 'text-blue-400' : 'text-gray-100'}`}>
                        {item.icon}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent side="right"
                     className='translate-x-10'>
                      {item.tooltip}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
}
