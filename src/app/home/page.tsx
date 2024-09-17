import { cookies } from 'next/headers';

export default function HomePage() {
  const cookiesStore = cookies();
  const token = cookiesStore.get('AUTH_TOKEN');

  if (!token) return <p>Token not found</p>;

  return (
    <main className="container mx-auto flex min-h-[100svh] items-center justify-center px-4">
      <h1>Bienvenido</h1>
    </main>
  );
}
