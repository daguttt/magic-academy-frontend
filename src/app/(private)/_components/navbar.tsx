import Image from 'next/image';
import Link from 'next/link';

import { Suspense } from 'react';

import { Skeleton } from '~/components/ui/skeleton';
import { NavbarUserAvatar } from './navbar-user-avatar';
import { SidebarButton } from './sidebar-button';

export async function Navbar() {
  return (
    <header className="content sticky flex h-16 items-center justify-between border-b">
      <SidebarButton />

      <Link href="/home" className="flex h-full flex-1 items-center pl-5">
        <picture>
          <source
            media="(prefers-color-scheme: light)"
            srcSet="/img/larger-v-logo.png"
          />
          <source
            media="(prefers-color-scheme: dark)"
            srcSet="/img/larger-v-logo-white.png"
          />
          <Image
            src="/img/larger-v-logo.png"
            alt="Descripción de la imagen"
            width={250}
            height={250}
          />
        </picture>
      </Link>

      {/* TODO: Add button to search courses for student  */}
      <Suspense fallback={<Skeleton className="h-20 w-36"></Skeleton>}>
        <NavbarUserAvatar />
      </Suspense>
    </header>
  );
}
