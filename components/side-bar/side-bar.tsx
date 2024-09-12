'use client';

import { useState } from 'react';
import Head from 'next/head';
import SideBarButton from './side-bar-button';
import { House, MapPin, Album, Search, User } from 'lucide-react';

export default function SideBar() {
  const [activeIcon, setActiveIcon] = useState<number | null>(null);
  const [openBar, setOpenBar] = useState(false);

  const handleMenuToggle = () => {
    setOpenBar(!openBar);
    console.log('Menu toggled:', openBar);
  };

  const handleActiveIcon = (index: number) => {
    setActiveIcon(index);
    console.log("active icon " + index);
  };

  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Home page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <SideBarButton openBar={openBar} onToggle={handleMenuToggle} />
      </header>

      <section
        id="navBar"
        className={`fixed top-0 left-0 h-full transition-all duration-300 ${openBar ? 'w-64' : 'w-16'} bg-gray-800 text-white`}
      >
        <div className="navigation">
          <div id="map">
            <div className="menuToggle" onClick={handleMenuToggle}>
              {/* Placeholder for the menu icon, you can customize it if needed */}
            </div>
          </div>

          <ul>
            {['Home', 'Map', 'Albums', 'Search', 'Profile'].map((text, index) => (
              <li
                key={index}
                className={`flex items-center p-3 rounded-lg cursor-pointer ${activeIcon === index ? 'active' : ''}`}
                onClick={() => handleActiveIcon(index)}
              >
                <span className="icon">
                  {index === 0 && <House size={24} />}
                  {index === 1 && <MapPin size={24} />}
                  {index === 2 && <Album size={24} />}
                  {index === 3 && <Search size={24} />}
                  {index === 4 && <User size={24} />}
                </span>
                <span className={`text ${openBar ? 'block' : 'hidden'}`}>{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
