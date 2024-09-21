'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { CreateClassButton } from './components/create-class';

export default function HomePage() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <main className="container mx-auto flex min-h-[100svh] items-center justify-center px-4">
        <h1>Bienvenido</h1>
        <CreateClassButton />
      </main>
    </QueryClientProvider>
  );
}
