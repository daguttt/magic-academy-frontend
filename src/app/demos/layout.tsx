'use client';

import { useState } from 'react';
import NavBar from '../../components/nav-bar/nav-bar';
import SideBar from '../../components/side-bar/side-bar';

export default function Layout({ children }: { children: React.ReactNode }) {
    const [openBar, setOpenBar] = useState(false);

    const handleMenuToggle = () => {
        setOpenBar(prevOpenBar => !prevOpenBar);
    };

    return (
        <>
            <header className='pt-20'>
              <NavBar openBar={openBar} onMenuToggle={handleMenuToggle} />
            </header>

            <main className={`transition-all duration-300 ${openBar ? 'ml-0' : 'ml-16'}`}>
                {children}
            </main>
        </>
    );
}
