'use client'

import React, { useState } from 'react';
import SideBarButton from './side-bar-button';
import { House, MapPin, Album, Search, User } from 'lucide-react';
import IconWithTooltip from './icon-tooltip';

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
    { icon: <MapPin className={classIcons}  />, tooltip: 'Map' },
    { icon: <Album className={classIcons}  />, tooltip: 'Albums' },
    { icon: <Search className={classIcons}  />, tooltip: 'Search' },
    { icon: <User className={classIcons}  />, tooltip: 'Profile' }
  ];

  return (
    <>
        <div className="p-2 bg-gray-800 border-red-600 h-1/5">
        <SideBarButton openBar={openBar} onToggle=      {handleMenuToggle} />
        </div>

      <aside
        id="navBar"
        className={`float-left h-screen transition-all duration-300 ${openBar ? 'w-0' : 'w-16'} bg-gray-800 text-white`}
      >
        <div className="navigation">
          <ul className="list-none p-0 m-0">
            {icons.map((item, index) => (
              <li
                key={index}
                className="relative flex items-center justify-center p-3 rounded-lg cursor-pointer hover:bg-gray-500"
                onClick={() => handleActiveIcon(index)}
              >
                <IconWithTooltip
                  icon={item.icon}
                  tooltipText={item.tooltip}
                />
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
}

