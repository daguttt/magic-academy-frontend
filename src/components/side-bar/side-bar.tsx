'use client';

import { useState } from 'react';
import { House, MapPin, Album, Search, User } from 'lucide-react';
import SideBarButton from './side-bar-button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

interface SideBarProps {
  openBar: boolean;
}

export default function SideBar({ openBar }: SideBarProps) {
  const [activeIcon, setActiveIcon] = useState<number | null>(null);

  const handleActiveIcon = (index: number) => {
    setActiveIcon(index);
  };

  const classIcons = `${openBar ? 'w-0' : 'w-6'} transition-all duration-300`;

  const icons = [
    { icon: <House className={classIcons} />, tooltip: 'Home' },
    { icon: <MapPin className={classIcons} />, tooltip: 'Map' },
    { icon: <Album className={classIcons} />, tooltip: 'Albums' },
    { icon: <Search className={classIcons} />, tooltip: 'Search' },
    { icon: <User className={classIcons} />, tooltip: 'Profile' },
  ];

  return (
    <>
      <aside
        id="navBar"
        className={`fixed top-0 h-screen bg-background transition-all duration-300 ${openBar ? 'w-0' : 'w-16'}`}
      >
        <div className="navigation">
          <ul className="mt-20 list-none">
            {icons.map((item, index) => (
              <li
                key={item.tooltip}
                className="relative flex cursor-pointer items-center justify-center rounded-lg hover:bg-foreground/30"
                onClick={() => handleActiveIcon(index)}
              >
                <TooltipProvider delayDuration={90} skipDelayDuration={200}>
                  <Tooltip>
                    <TooltipTrigger className="p-3.5 pl-4 pr-4">
                      <span
                        className={`duration-50 transition-colors ${activeIcon === index ? 'text-blue-400' : 'text-foreground'}`}
                      >
                        {item.icon}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="translate-x-10">
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
