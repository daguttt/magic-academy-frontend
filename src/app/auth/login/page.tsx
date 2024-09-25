import type { Metadata } from 'next';
import { LoginFormContainer } from './components/login-form-container';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Ingreso',
};

export default function LoginPage() {
  return (
    <main className="container mx-auto flex min-h-[100svh] items-center justify-center px-4">
      <LoginFormContainer />
    </main>
  );
}
