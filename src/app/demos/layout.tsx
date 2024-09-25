'use client';

import { useState } from 'react';
import SideAndNavBar from '~/components/nav-bar/side-and-nav-bar';
export default function Layout({ children }: { children: React.ReactNode }) {
  const [openBar, setOpenBar] = useState(false);

  const handleMenuToggle = () => {
    setOpenBar((prevOpenBar) => !prevOpenBar);
  };

  return (
    <>
      <main
        className={`pt-20 transition-all duration-300 ${openBar ? 'ml-0' : 'ml-16'}`}
      >
        {children}
      </main>

      <aside className="">
        <SideAndNavBar openBar={openBar} onMenuToggle={handleMenuToggle} />
      </aside>
    </>
  );
}
