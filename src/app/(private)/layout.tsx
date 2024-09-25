import { QueryProvider } from '~/lib/query-provider';

import { Navbar } from './_components/navbar';

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
