import { Suspense } from 'react';

import { Skeleton } from '~/components/ui/skeleton';
import { NavbarUserAvatar } from './navbar-user-avatar';
import { SidebarButton } from './sidebar-button';

export async function Navbar() {
  return (
    <header className="content sticky flex h-16 items-center justify-between border-b">
      <SidebarButton />

      {/* <Image src="/logo.png" alt="Logo" width={100} height={100} /> */}
      {/* TODO: Replace with the logo */}
      <h1>Magic Academy</h1>

      {/* TODO: Add button to search courses for student  */}
      <Suspense fallback={<Skeleton className="h-20 w-36"></Skeleton>}>
        <NavbarUserAvatar />
      </Suspense>
    </header>
  );
}
