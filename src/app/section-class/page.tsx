'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export default function HomePage() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <main className="container mx-auto flex min-h-[100svh] items-center justify-center px-4">
        <h1>Bienvenido</h1>
      </main>
    </QueryClientProvider>
  );
}
