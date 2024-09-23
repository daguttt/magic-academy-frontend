import { Suspense } from 'react';

import { Skeleton } from '~/components/ui/skeleton';
import { getUser } from '~/lib/session';
import { LogoutButton } from './_components/log-out-button';
import { QueryProvider } from '~/lib/query-provider';
import Image from 'next/image';

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryProvider>
      <Navbar />
      {children}
    </QueryProvider>
  );
}

function Navbar() {
  return (
    <header className="flex items-center justify-between p-6">
      <h1>Magic Academy</h1>
      <div className="flex gap-2">
        <LogoutButton />
        <Suspense fallback={<Skeleton className="h-20 w-36"></Skeleton>}>
          <NavbarUserAvatar />
        </Suspense>
      </div>
    </header>
  );
}

async function NavbarUserAvatar() {
  const user = await getUser();

  console.log('From NavbarUserAvatar', { user });

  return (
    <div className="flex items-center gap-2">
      {/* // eslint-disable-next-line @next/next/no-img-element */}
      <Image
        src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
        alt="Avatar"
        width={50}
        height={50}
        className="rounded-full"
      />
      <p>{user?.name}</p>
    </div>
  );
}
